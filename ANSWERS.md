- Description of the problem and solution
Problem:
The patients need to fill a screener form with standardized questions to assess a medical condition and see the results of screening process.

Solution:
A web application that enables users to complete the screening form and view the results of the automated screening process. The responses will be stored in a database, with a predefined logic employed to assess conditions based on the patients' answers.

- Reasoning behind your technical choices

Backend: 
The languages needed for this position, Postgres and Typescript, have been utilized.
The persistence layer has been implemented using Sequelize ORM and an Active Record pattern. This Active Record pattern functions well when the data access logic is relatively simple. In instances of more complex persistence logic, I would opt for the Repository pattern.
Concerning the domain and API layers, the backend consists of only two main layers. Given the simplicity and small size of the project, a Service Layer is not necessary. As previously mentioned, the persistence layer has been implemented using an Active Record pattern, which does not clearly distinguish between the domain and persistence layers.
The API layer has been implemented using Express. I chose Express because it is the most popular Node.js framework and it is easy to use.

Frontend:

React and TypeScript are the languages required for the position.
I chose Create React App for the project because it is widely known and used, and it's suitable for a small project.
I opted to use local state since all interaction occurs within a single top-level component. If the project were larger, I would have used ReactQuery (TanStack Query) or Redux for state management.
I used PrimeReact for the UI components as I'm interested in becoming more familiar with it. I would have chosen another UI library if it was explicitly required.



- Describe how you would deploy this as a true production app on the platform of your choice:

I would deploy the database in a clustered multi-zone configuration. AWS RDS, as a self-managed solution, would serve as an excellent alternative for this configuration.

Services would be deployed into a Kubernetes or AWS ECS cluster, which would provide a load balancer and auto-scaling capabilities. I have already established a basic configuration for containerization using Docker.

To automate the deployment process, I have set up a Github Actions workflow that builds and pushes the Docker images to a private AWS container repository (ECR). I would employ a similar workflow to deploy the services into the cluster.

For deploying the web application, which is a SPA (Single Page Application), I would utilize AWS S3 and CloudFront. I have already provided a basic configuration for this using Github Actions.

* How would ensure the application is highly available and performs well?

I would utilize the previously mentioned configuration and monitor the application with AWS CloudWatch. Additionally, we will employ a real-time monitoring tool such as New Relic or Datadog.

* How would you secure it?

There were no specific requirements for security. Security is a vast topic; therefore, securing the application encompasses various aspects, such as authentication and authorization, to protect the application from unauthorized access. Endpoint protection measures, like AWS and AWS Shield, are deployed to guard the application against DDoS attacks and other forms of misuse. Communication security is maintained using HTTPS and TLS certificates. Infrastructure security is implemented using AWS IAM and AWS Security Groups to protect the infrastructure from unauthorized access.

* What would you add to make it easier to troubleshoot problems while it is running live?
I would employ well-defined logging practices and a centralized logging tool in conjunction with robust error handling practices. Consider the adoption of defensive programming practices to avoid unexpected errors. These practices could include strict input validation and the enforcement of specific preconditions and postconditions on the most critical functions.

- Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
* For frontend state management, I would employ systems such as Redux or ReactQuery.
* I would integrate a more sophisticated persistence layer, such as the Repository pattern.
* I would incorporate both UI tests and integration tests.
* I would implement schema validation for the API endpoints.