import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { getAllProducts } from "./handlers/products";
import { getProductById } from "./handlers/products";
import { updateProduct } from "./handlers/products";
import { deletProduct } from "./handlers/products";
import { createProduct } from "./handlers/products";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate,
} from "./handlers/updates";

const router = Router();

export enum UPDATE_STATUSES {
  IN_PROGRESS,
  SHIPPED,
  DEPPRECATED,
}
//  Products
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deletProduct);

//  Update
router.get("/updates/:productId", getAllUpdates);
router.get("/update/:id", getUpdateById);
router.put(
  "/update/:productId/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(Object.values(UPDATE_STATUSES)).optional(),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update/:productId",
  body("title").exists().isString(),
  body("body").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:productId/:id", deleteUpdate);

//  Update Point
router.get("/updatepoints", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/updatepoint/:id", () => {});

router.use((err, req, res, next) => {
  console.log(err?.message ?? err); // or err.toString()

  if (err.type === "auth") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (err.type === "input") {
    res.status(400).json({
      message: "Invalid input",
    });
  } else {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
