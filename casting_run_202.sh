echo "All The Best..." &&
# Go to project directory
cd /opt/Nodeserver/Gig2Gig/Gig2Gig_Casting &&
echo "Step 1 completed successfully." &&

# Git pull
git pull origin development &&
echo "Step 2 completed successfully." &&

# Create docker build
sudo docker build -t gig2gig-casting . &&
echo "Step 3 completed successfully." &&

# Remove running docker container
sudo docker rm gig2gig-casting &&
echo "Step 4 completed successfully."

# Start docker container
sudo docker run -d --name gig2gig-casting -p 7031:80 gig2gig-casting &&
echo "Step 5 completed successfully."

# Remove closed container
sudo docker system prune &&
echo "Code deployed successfully."