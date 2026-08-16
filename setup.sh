#!/bin/bash

# Setup Script for Local Development

echo "🚀 Setting up Ecommerce MERN App for Development..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 18+ from https://nodejs.org${NC}"
    exit 1
fi

echo -e "${BLUE}Node version: $(node -v)${NC}"
echo -e "${BLUE}NPM version: $(npm -v)${NC}"

# Setup Server
echo ""
echo -e "${BLUE}📦 Setting up Server...${NC}"
cd Server

# Copy .env.example if .env doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}Created .env file. Please update it with your credentials.${NC}"
fi

# Install dependencies
echo "Installing Server dependencies..."
npm install

cd ..

# Setup Client
echo ""
echo -e "${BLUE}📦 Setting up Client...${NC}"
cd Client

# Copy .env.example if .env.local doesn't exist
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}Created .env.local file${NC}"
fi

# Install dependencies
echo "Installing Client dependencies..."
npm install

cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Update Server/.env with your MongoDB URI and Khalti keys"
echo "2. Update Client/.env.local with your API base URL"
echo "3. Start MongoDB locally or use MongoDB Atlas"
echo ""
echo -e "${BLUE}🚀 To run the app:${NC}"
echo "   Terminal 1 (Server): cd Server && npm run dev"
echo "   Terminal 2 (Client): cd Client && npm run dev"
echo ""
echo -e "${BLUE}📖 For deployment: Read DEPLOYMENT_GUIDE.md${NC}"
