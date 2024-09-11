This is a simple personal summary from my owasp studies from [OWASP Top 10 Proactive Controls](https://top10proactive.owasp.org/) so I can easily index and remeber some topics.

TODO: project to consolidate everything.

1. Implement Access Control
	- Role Based Access Control (RBAC)
	- Attribute based access Control (ABAC)
	- Features denied by default
	- Just Enough Access (JEA)
2. Use Cryptography the proper way
	- Classify data types in your application (public, private, sensitive)
	- Never transmit plain-text data (TLS)
	- Hash or cripto sensitive data (passwords for instance)
	- Use Application SEcrets Management (AWS Secrets Manager) to keys
	- Rotate keys (key rollover)
	- All authorized access to secret key MUST be logged
	- Use TLS
3. Validate all Input and Handle Exceptions
	- Syntatic validity (type validations like is number, has lenght x)
	- Semantic validity (range validation)
	- Allowlisting and Denylisting
	- Client Side and Server side validation
	- Care for ReDoS
	- Limit input validation (Prevent DDoS)
	- Sanitize input (prevent XSS, SQL Injection, etc)
4. Address Security from the start
	- Keep it simple (KISS)
	- Identify and minimize exposed components
	- Design for Defense-in-Depth
	- Use well know secure architecture patterns
5. Secure by default configurations
	- Implement configurations based on Least Privilege principle
	- Access is denied by default
	- Prefer for infrastructure as Code
6. Keep your Components Secure
	- Update dependencies
	- Check if dependency is ok to use
		- Sources
		- Popularity
		- Activity
		- Maturity
		- Complexity
		- Security
7. Implement Digital Identity
	- Authentication Assurance Levels
		- Passwords
		- Multi-Factor Authentication
		- Cryptographic Based Authentication
	- Sesion Management
	- Secure password recovery mechanism
	- Secure password storage
	- JWT with signature
	- Cookies with
		- Set right domain
		- secure flag
		- HttpOnly
		- samesite
8. Leverage Browser Security Features
	- HTTP Strict Transport Security (HSTS)
	- Content Security Policy (CSP)
	- Referrer-Policy
	- Cookie secure flag
	- Host Allowlist CSP
	- Strict CSP
	- Prevent Clickjacking
		- X-Frame-Options (XFO)
		- CSP
	- Prevent CSRF Attacks
		- Same-Origin Cookies
		- Fetch Metadata Request Headers
9. Implement Security Logging and MOnitoring
	- Log suspicious activity
	- monitor for suspicious data
10. Stop Server Side Request Forgery

