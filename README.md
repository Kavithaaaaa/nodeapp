# multi-tenants
manage multi tenants - super admin can manage all clients

# Local Env Setup
  Cloning

    git clone https://github.com/CareerEdgeDevOps/multi-tenants.git
# Frontend - APP Service
  1. Install packages
  
    cd apps/app-server
    npm ci
  2. Create new .env file in the root of the apps/app-server folder and include the following settings.

    CORE_API_URL=http://localhost:3020/
 
 # Backend - API Service
  1. Install packages
 
    cd apps/api-server
    npm ci
  2. Create new .env file in the root of the apps/api-server folder and include the following settings.
  
    # mongodb 
    MONGODB_CONNECTION_STRING=mongodb://localhost:27017
    MONGODB_DB_NAME=tenants
    #debug message
    ENABLE_DEBUG_MSGS=true
