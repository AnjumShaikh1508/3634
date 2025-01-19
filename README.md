# Marketplace App

A responsive marketplace application for browsing, searching, filtering, and managing products. Built with modern web technologies, this app showcases dynamic product cards with essential details, discounts, and images from Unsplash.

## Features

- **Product List:** Displays all available products with title, price, rating, and discount.
- **Product Filters:** Filter products by categories, price range, ratings, and more.
- **Search Functionality:** Search products by name or keyword.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Wishlist and Cart:** Add/remove items to/from the wishlist and cart.
- **Dynamic Data:** Utilizes dummy product data with Unsplash images for realistic display.

---

## Technologies Used

- **Frontend:** REACT, CSS, JavaScript , Tailwind
- **Styling:** CSS Grid and Flexbox for layouts
- **API:** DummyjsonAPI
- **Development Tooling:** Vite for faster build and development

---

## Project Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/marketplace-app.git
   cd marketplace-app

Install dependencies:

bash
npm install
or

bash
yarn install

Start the development server:
bash
npm run dev
or

bash
yarn dev

Open your browser and navigate to:

http://localhost:3000

Project Structure


├── src
│   ├── assets          # Static files (images, fonts, etc.)
│   ├── components      # Reusable UI components (e.g., ProductCard)
│   ├── pages           # Page-level components (e.g., Home, Products)
│   ├── styles          # Global and component-specific CSS
│   ├── utils           # Utility functions (e.g., data fetching)
│   ├── App.js          # Main application file
│   └── main.js         # Entry point for Vite
├── public              # Publicly served files
├── package.json        # Project configuration
├── README.md           # Project documentation
└── index.html          # HTML template
Features Walkthrough
1. Product Cards
Each product card includes:

Title: Name of the product
Price: Shown prominently
Rating: Star rating out of 5
Discount: Highlighted percentage discount
Image: Main product image from API

2. Filters
Categories: Select products by predefined categories.
Price Range: Use a slider to filter products within a price range.
Ratings: Filter products by rating threshold.

3. Wishlist and Cart
Add products to the wishlist or cart by clicking the respective buttons.
Remove items easily with a single click.

4. Responsive Design
The layout dynamically adjusts based on screen size:

Desktop: Multi-column grid view.
Mobile: Single-column layout for better usability.
Customizing Product Data
The product data is in src/data/products.js. You can modify this file to add or remove products or update existing details.

Example:

{
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "Popular mascara for volumizing and lengthening.",
  price: 9.99,
  discount: "7.17%",
  rating: 4.94,
  images: [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
  ],
  thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
}
Deployment
To deploy the app:

Build the project:

bash
npm run build
or

bash
yarn build
Serve the build folder using any static hosting provider:

Netlify
Vercel
GitHub Pages

Future Enhancements
Integrate a real-time backend API for live product data.
Implement advanced sorting and filtering options.
Add support for multiple languages.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature:
bash

git checkout -b feature-name
Commit your changes:
bash

git commit -m "Add feature-name"
Push to the branch:
bash

git push origin feature-name
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.


Acknowledgments
Unsplash for providing free, high-quality placeholder images.
Vite for the fast development environment.
Masai School for inspiring this project.


Deployed Link of project
https://sweet-beijinho-848962.netlify.app/