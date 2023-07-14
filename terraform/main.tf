# Create a Bucket
resource "aws_s3_bucket" "antlms" {
  bucket_prefix = "antlms"

  tags = {
    Name        = "antlms"
    Environment = "Dev"
  }
}

# Create RDS DB
resource "aws_db_instance" "default" {
  allocated_storage    = 10
  db_name              = "antlms"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t4g.micro"
  username             = "antlms"
  manage_master_user_password = true
  auto_minor_version_upgrade = true
  storage_encrypted = false
  storage_type = "gp3"
  deletion_protection = true
  skip_final_snapshot  = true
}

# TODO: Switch to Module https://github.com/terraform-aws-modules/terraform-aws-ecs/tree/master/examples/ec2-autoscaling

# Create ECS Cluster

resource "aws_ecs_cluster" "antlms" {
  name = "antlms"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}


resource "aws_autoscaling_group" "antlms" {
  # ... other configuration, including potentially other tags ...
  availability_zones = ["ap-southeast-2a","ap-southeast-2b","ap-southeast-2c"]
  
  desired_capacity   = 1
  max_size           = 1
  min_size           = 1

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

resource "aws_ecs_capacity_provider" "ec2" {
  name = "antlms-ecs-capacity-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.antlms.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      maximum_scaling_step_size = 2
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 95
    }
  }
}