#!/bin/bash

# Apply migrations using psql directly if migrate tool fails
# This is a fallback method to ensure migrations are applied

echo "Applying migrations manually..."

# Extract connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/dbname?sslmode=disable
DB_URL="${DATABASE_URL}"

# Execute init migration
echo "Running 000001_init.up.sql..."
psql "$DB_URL" -f /root/migrations/000001_init.up.sql

# Execute test data migration
echo "Running 000002_test_data.up.sql..."
psql "$DB_URL" -f /root/migrations/000002_test_data.up.sql

echo "Migrations completed!"
