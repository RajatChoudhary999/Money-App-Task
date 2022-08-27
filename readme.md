Below are the steps to run this project on your local system

1. Clone the Repository on your Machine.
2. After Cloning the repo cd into the MoneyApp-task.
3. Run the following command after navigating inside the folder: npm i. It will install the necessary node module for running the project.
4. Execute the following command after 3rd step: node app.js. This will run the application on your system.

Below are the APIs :-

1. Create Blog Api
   URL:http://localhost:3000/create_blog //Post Request
   body:{
   "title":"Bitcoins",
   "body":"This is body",
   "id":"7c401d91-3852-4818-985d-7e7b79f771c3"
   }

2. Update Api //Post Request
   URL:http://localhost:3000/update_blog
   body:{
   "title":"tesl",
   "body":"Elon Musk",
   "id":"7c401d91-3852-4818-985d-7e7b79f771c3"
   }

3. Delete Blog Api //Post Request
   URL:http://localhost:3000/delete_blog_id
   body:{
   "id":"7c401d91-3852-4818-985d-7e7b79f771c3"
   }

4. Post Review Api //Post Request
   URL: http://localhost:3000/post_review
   body:{
   "userId":"moneyApp",
   "description":"very insightFull",
   "reviewId":"7c401d91-3852-"
   }

5. Delete Review Api //Post Request
   URL:http://localhost:3000/delete_review
   body:{
   "reviewId":"7c401d91-3852-"
   }

6. Get ALl Blogs Api //Get Request
   URL:http://localhost:3000/get_all_blogs

7. Get Blog By Id //Get Request
   URL:http://localhost:3000/get_blog_by_id
   body:{
   "id":"7c401d91-3852-4818-985d-7e7b79f771c3"
   }
