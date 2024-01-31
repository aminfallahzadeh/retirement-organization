# Retirement Organization Login Screen Project

## Table of Contents

- [Retirement Organization Login Screen Project](#retirement-organization-login-screen-project)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Usage](#usage)
  - [Additional Notes](#additional-notes)
  - [License](#license)
  - [Contact](#contact)

## Introduction

This project represents the login screen for the Retirement Organization, managed by DAHAK-CO and affiliated with the Municipality of Tehran. The login screen is a part of a larger web application designed to facilitate access for authorized users to the organization's services.

## Project Structure

The project is organized into several files and directories:

- **`src/App.jsx`**: The main entry point for the application. It initializes the `AuthProvider` for managing authentication and renders the `Outlet` which serves as a placeholder for nested routes. The `ToastContainer` is used for displaying notifications.

- **`src/providers/AuthProvider.jsx`**: Manages authentication state and provides authentication context to the application.

- **`src/pages/Login.jsx`**: Represents the login page where users can authenticate themselves.

- **`src/pages/Dashboard.jsx`**: Placeholder for the dashboard page (currently commented out).

- **`src/assets/styles/main.scss`**: Stylesheet for the project.

- **`index.css`**: Styling for the index file.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/dahakco/login-screen.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

The project uses the following dependencies:

- **`react`**: JavaScript library for building user interfaces.
- **`react-router-dom`**: Routing library for React applications.
- **`react-toastify`**: Notification library for displaying alerts and messages.

## Usage

To integrate the login screen into your application, you must comply with the terms of the [GNU General Public License v3.0](LICENSE).

1. Import the `AuthProvider` from `./providers/AuthProvider` and wrap your application with it.
2. Create routes using `react-router-dom` and define the login and dashboard pages accordingly.

   ```javascript
   // Example route configuration
   const router = createBrowserRouter([
     {
       path: "/login-screen/",
       element: <App />,
       children: [
         {
           path: "/login-screen/",
           element: <Login />,
         },
         {
           path: "/login-screen/dashboard",
           element: <Dashboard />,
         },
       ],
     },
   ]);

   ReactDOM.createRoot(document.getElementById("root")).render(
     <RouterProvider router={router} />
   );
   ```

3. Ensure that your application adheres to the terms of the GPL-3 license. This includes providing the source code of your application to any user who requests it, and ensuring that any modifications to the original code are also distributed under the GPL-3 license.

For detailed information on your rights and obligations under the GPL-3 license, please refer to the [LICENSE](LICENSE) file.

Feel free to reach out for any further assistance or clarification regarding the usage and licensing of this project.

## Additional Notes

- The current structure includes a commented-out `Dashboard` component. You can uncomment and customize it based on the organization's requirements.

- Ensure that the necessary routes are configured to navigate between the login screen and the dashboard.

- Customize styles in `/sass` directory to match the organization's branding and design guidelines.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Contact

If you have any questions, issues, or feedback, feel free to contact us:

- **Email:** dahakco@vatanmail.ir
- **GitHub Issues:** [Project Issues](https://github.com/your-username/your-repo/issues)
