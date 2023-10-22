# Real Time Medical Allergy/Side Effect Verification System for IBM DataThon 2023


Welcome to the Real Time Medical Allergy/Side Effect Verification System developed for IBM DataThin 2023. This system provides real-time medical data verification and management, allowing healthcare professionals to access patient data securely and efficiently.

## Features

1. **Credential-Based Access**: Secure access to patient data, ensuring privacy and compliance with data protection regulations.

2. **Fast NodeJS Backend**: Utilizes a lightning-fast NodeJS backend to deliver rapid results and responsiveness.

3. **Simple Yet Responsive Web Layout**: The user-friendly web interface is designed for simplicity and responsiveness, making it easy for medical professionals to use.

4. **Strong NoSQL Database**: Powered by MongoDB, our system boasts a robust NoSQL database that adapts seamlessly to various data schemas.

5. **Flashy Error Alerts**: Eye-catching error alerts ensure that important notifications are never overlooked.

6. **Atomic Data Insertion**: Ensures data consistency and eliminates potential errors by performing atomic insertion of data into the database.

7. **Well-Structured Patient Prescription**: Patient prescription information is organized and easy to access, enhancing the quality of healthcare services.

## Getting Started

To run the code, follow these steps:

1. Open the project folder in the IDE of your choice.

2. Run `testmed.js` to generate a database of medicines, allergens, and side effects.

3. Start the server by running `app.js` using the following command:

   ```bash
   node app.js
   ```

   This will open the server at [http://localhost:3000](http://localhost:3000).

4. Modify the database connection settings in both `app.js` and `testmed.js` to match your database. By default, we are using MongoDB and connecting to `localhost:27017` or `0.0.0.0:27017`.

```javascript
// Example MongoDB connection settings
const mongoURI = 'mongodb://localhost:27017/your-database-name';
```

## Database Configuration

Make sure to set up your MongoDB instance or adjust the database connection details according to your requirements in both `app.js` and `testmed.js`.

```javascript
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
```

---

Feel free to reach out to us for any questions or support. Thank you for using the Real Time Medical Allergy/Side Effect Verification System!
