# Create RDS DB
resource "aws_db_instance" "default" {
  allocated_storage           = 10
  db_name                     = "antlms"
  engine                      = "postgres"
  engine_version              = "15"
  instance_class              = "db.t4g.micro"
  username                    = "antlms"
  manage_master_user_password = true
  auto_minor_version_upgrade  = true
  storage_encrypted           = false
  storage_type                = "gp3"
  deletion_protection         = true
  skip_final_snapshot         = true
}
