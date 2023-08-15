# Create a Bucket
resource "aws_s3_bucket" "antlms" {
  bucket_prefix = "antlms"

  tags = {
    Name        = "antlms"
    Environment = "Dev"
  }
}