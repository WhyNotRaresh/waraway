-- Script to init waraway database on first docker-compose up.
SELECT 'CREATE DATABASE waraway'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'waraway')\gexec
