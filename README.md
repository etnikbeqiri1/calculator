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
      <li>Run the command <code>npm run dev</code> in the <code>frontend</code> directory to start the ReactJS development server.</li>
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