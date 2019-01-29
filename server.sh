#!/bin/bash 
echo "Restarting Nginx Proxy Server"
sudo systemctl restart nginx
echo "Setting Node Enviroment to Production"
env NODE_ENV=production
echo "Serving Bezop Marketplace Frontend!"
node serve.js
