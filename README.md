Sure, I can provide a more detailed Installation and Features section:

---

# Unified Health Record Management System 💉💊🏥

A comprehensive SaaS platform designed to streamline and simplify the management of health records for Hospitals, Doctors, and Patients. Providing individual dashboards tailored to each role, our platform serves as a one-stop solution for all healthcare record needs. 🚀

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Features 🎯

- **Unique Health ID**: A unique identifier assigned to each patient, enabling efficient management and retrieval of health records. 🆔
- **Doctor Dashboard**: Allows doctors to access a patient's history, add new records, and manage their information efficiently. 👨‍⚕️
- **Hospital Dashboard**: Facilitates hospitals in managing their affiliated doctors and patients while maintaining a seamless record system. 🏥
- **Patient Dashboard**: Empowers patients by allowing them to access their health history, book appointments, and much more. 🧑‍⚕️
- **Admin Dashboard**: Enables administrators to add hospitals and doctors to the platform, ensuring a comprehensive and updated database. 👨‍💼

## Installation 💻

Follow these steps to get the platform up and running on your local machine:

1. **Clone the Repository**: Run `git clone [<repository-url>](https://github.com/DipeshRajoria007/Prana.git)` to clone the repository to your local machine.

2. **Install Node.js**: Ensure that you have Node.js installed on your system. If not, download it from [here](https://nodejs.org/en/download/).

3. **Install MongoDB**: As we're using MongoDB Atlas as our database, make sure you have an account. If not, create one [here](https://account.mongodb.com/account/register).

4. **Set up Environment Variables**: Create a `.env` file in the root of your project and add the necessary environment variables. This typically includes the MongoDB Atlas connection string and other service-specific keys.

5. **Install Dependencies**: Run `npm install` in the root of your project to install all necessary packages and dependencies.

6. **Start the FE Server**: 
  `cd frontend` 
  Run `npm run dev` to start the server. The platform should now be running on `localhost:5173`.
7. **Start the BE Server**:
  `cd ../backend` 
  Run `nodemon index.js` to start the BE server. the platform should now be running on `localhost:8000`

## Usage 🚀

You must be having credentials to login and start using it, for that contact me😌

## Contribution 🤝

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License 📝

Unless explicitly stated otherwise, all rights including but not limited to copyright and intellectual property rights in and to this software and its associated documentation files ("The Software") are reserved. Use of the Software is not permitted without prior written authorization from the author.
