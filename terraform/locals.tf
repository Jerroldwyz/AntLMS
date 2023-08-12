locals {
  region = "ap-southeast-2"
  name   = "antlms"

  vpc_cidr = "10.0.0.0/16"
  azs      = slice(data.aws_availability_zones.available.names, 0, 3)

  container_name = "antlms"
  container_port = 80

  tags = {
    Name       = local.name
    Repository = "https://github.com/Jerroldwyz/SEPA"
  }
}