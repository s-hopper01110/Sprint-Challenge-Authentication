What is the purpose of using sessions?

- Helps with user experience by keeping the user logged in and allowing the server to store information about a client and persisting data across requests. 


What does bcrypt do to help us store passwords in a secure manner.
- it provides password hashing function,
- implements salting both manual and automatically,
- accumulative hashing rounds by using an algorithm. 


What does bcrypt do to slow down attackers?
- hashes the information multiple times. S, the attacker has to know the algorithm and how many rounds were used to generate the hash. 



What are the three parts of the JSON Web Token? 

- Headers
- Payload 
- Signature