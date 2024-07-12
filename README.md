<div align="center">
  <h1>Project Overview</h1>
</div>

---

# Project Name: Camper Shop Frontend

## Introduction

**Campers Shop:** Your Ultimate Destination for Quality Camping Gear and Outdoor Essentials

## Project Description

Campers Shop is an e-commerce platform dedicated to catering to the needs of camping enthusiasts. It aims to provide a comprehensive range of high-quality camping gear and outdoor essentials to enhance the camping experience for individuals and families alike.

The primary purpose of Campers Shop is to offer a convenient and reliable online marketplace where customers can find everything they need for their camping trips. From tents and sleeping bags to cooking gear, electronics, and hiking essentials, the platform aims to be a one-stop shop for all camping needs.

## Core Pages and Functionalities

Develop a comprehensive e-commerce website with the following core pages and functionalities:

- Homepage
- Products Page
- Product Details Page
- Product Management
- Cart Page
- About Us Page

## Detailed Requirements

### 1\. Homepage

- **Header:** Include logo and site name.
- **Navbar:** Navigation links to other pages such as About Us, Products Page, and other necessary links. Include a cart icon, wishlist icon, or other essential icons or links.
- **Hero Section:** A visually appealing section to captivate visitors.
- **Best Selling/Recommended Products Section:** Products you want to introduce to the market is highlighted. A view more button under this section is added, that will navigate to the products page.
- **Categories Section:** Product categories are displayed with images.
- **Featured Products:** A few highlighted products with a button to view the details page are shown.
- **Unique Section:** A testimonial section is added.
- **FAQ Section:** Frequently asked questions about products, shipping, or other important thing are implemented.
- **Footer:** Contact information, social media links, and other relevant links are added.

### 2\. Products Page

- **Product Listings:** All products are displayed in a grid view.
- **Product Details Button:** Redirected to the Product Details page upon clicking.
- **Searching and Filtering:**
  - Search bar for searching products by name or description.
  - Filters for categories and price range.
  - Sorting options (ascending and descending by price).
  - Clear button to reset all filters.

### 3\. Product Details Page

- **Product Information:** Product name, price, stock-quantity, description, category, ratings, and images are displayed.
- **Add to Cart Button:** Users are allowed to add the product to the cart.
  - **Note:** Duplicate products added are handled to the cart. If a product is already in the cart, only its quantity will increase, up to the available stock. If the quantity reaches the stock limit or the product is out of stock, the "Add to Cart" button for that product will be disabled.

### 4\. Product Management

- **Product List Table:** Products in a table format are displayed with columns for product image, name, price, category, and actions.
- **Actions:**
  - Button to create a new product.
  - Allow modification of existing details for updating a product.
  - Allow to Delete products, add Prompt confirmation for deleting a product.

### 5\. Cart Page

- **Cart Items:** List products added to the cart with their quantities.
- **Quantity Controls:** Increase or decrease the quantity of each product.
  - **Minimum Quantity:** 1
  - **Maximum Quantity:** Limited by the available stock of the product.
- **Remove Product Button:** Users are allowed to remove a product from the cart. Prompt for confirmation before removing.
- **Pricing Details:** Detailed total pricing is displayed below the product list. Dynamically updated when a product is added, removed, or when the quantity is increased or decreased.
- **Place Order Button:**The user are allowed to place an order.
  - If the product is in stock, this button will be activated. If the product is out of stock, the button will be deactivated. Clicking this button will take the user to the checkout page.

### **6\. Checkout Page**

**User Details:** User information is collected, including name, email, phone number, and delivery address, through a form.

**Payment Methods:**

- **Cash on Delivery:** Selecting this option and clicking the "Place Order" button will redirect the user to a success page, and the product quantity will be deducted from the stock.

### 7\. About Us Page

- **Contact Information:** Phone number, email address, and physical address are displayed.
- **Map:** Embed a Google Map showing the location of the shop.
- **Social Media Links:** Include icons linking to social media pages.
- **Mission Statement:** The mission and values of the company.
- **Team Members:**Key team members are introduced with photos and brief bios.

## Technology Stack

The technology stack used in the Camper Shop project includes:

- **Frontend:**

  - React
  - Redux toolkit and RTK Query
  - TypeScript (for type safety)

## Installation Guideline

### Prerequisites

- **Node.js:** Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/) and follow the installation instructions.

- **npm (Node Package Manager):** npm comes bundled with Node.js installation. Check that npm is installed by running:
  ```bash
  npm -v
  ```
- **Git Bash:** Install Git Bash to run Git commands on Windows. You can download it from [Git for Windows](https://gitforwindows.org/).

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/solayman-bd/camper-shop-frontend.git

   ```

2. run command:

```bash
   npm run dev

```

### Live Deoployment LinK:

```bash
  https://campingshop.netlify.app/

```
