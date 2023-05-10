<div>
   <h1>Calculator App with JWT using Stacks - README</h1>
<img alt="preview image" src="https://i.imgur.com/LJSCdvH.png" />   
<h2>Overview</h2>
   <p>This calculator application allows users to perform arithmetic calculations. It is built using ReactJS on the frontend and Laravel on the backend. It uses JWT authentication for secure user login and session management. The calculation operations are implemented using a stack data structure.</p>
   <h2>Installation</h2>
   <h3>Prerequisites</h3>
   <ul>
      <li>Node.js and NPM</li>
      <li>Composer</li>
      <li>Docker</li>
   </ul>
   <h3>Installation Steps</h3>
   <ol>
      <li>Clone this repository to your local machine.</li>
      <li>Navigate to the <code>backend</code> directory in your terminal and run <code>make run-app-with-setup-db</code>. This will build and run the Docker containers for the Laravel backend and set up the database with initial seed data.</li>
      <li>Navigate to the <code>frontend</code> directory in your terminal and run <code>npm install</code>. This will install the necessary dependencies for the ReactJS frontend.</li>
      <li>Create a <code>.env</code> file in the <code>frontend</code> directory and set the <code>REACT_APP_API_URL</code> environment variable to the URL of the backend API. For example: <code>REACT_APP_API_URL=http://localhost:8000/api/</code>.</li>
      <li>Run the command <code>npm start</code> in the <code>frontend</code> directory to start the ReactJS development server.</li>
   </ol>
   <h2>Usage</h2>
   <ol>
      <li>Open your web browser and navigate to <code>http://localhost:3000</code>.</li>
      <li>If you do not have an account, click the <code>Register</code> button to create a new account.</li>
      <li>After logging in, you will be redirected to the calculator page where you can perform calculations.</li>
      <li>Click on the numeric buttons to enter the digits of the numbers you want to calculate.</li>
      <li>Click on the operator buttons to perform the desired operation.</li>
      <li>Click on the <code>C</code> button to clear the calculator screen.</li>
      <li>Click on the <code>=</code> button to get the result of the calculation.</li>
      <li>To log out, click on the <code>Logout</code> button.</li>
   </ol>
   <h2>Features</h2>
   <ul>
      <li>User authentication and session management using JWT.</li>
      <li>Secure communication between frontend and backend using HTTPS.</li>
      <li>Arithmetic operations implemented using a stack data structure.</li>
      <li>Responsive design that works on desktop and mobile devices.</li>
   </ul>
   <h2>Credits</h2>
   <p>This project was created by Etnik for educational purposes only. It is licensed under the MIT license.</p>
</div>