#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "Installing root dev deps..."
npm install
echo "Installing client dependencies..."
cd "$ROOT/client"
npm install
echo "Installing server dependencies..."
cd "$ROOT/server"
npm install
echo "Starting server (port 4000) and client (vite)..."
cd "$ROOT/server"
npm run dev &

cd "$ROOT/client"
npm run dev
