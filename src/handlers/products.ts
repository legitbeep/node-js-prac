import prisma from "../db";

export const getAllProducts = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      // population / joint
      include: {
        products: true,
      },
    });

    res.json({
      data: user.products,
    });
  } catch (e) {
    console.log("Get products error:", e.message);
    res.status(500);
    res.json({
      message: "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });

    res.json({
      data: product,
    });
  } catch (e) {
    console.log("getProductById error:", e.message);
    res.status(500);
    res.json({
      message: "Server error",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.json({
      data: product,
    });
  } catch (e) {
    console.log("createProduct error:", e.message);
    res.status(500);
    res.json({
      message: "Server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await prisma.product.update({
      where: {
        // id: req.params.id,
        // id_belongsToId: req.user.id
        // both works
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.json({
      data: updated,
    });
  } catch (e) {
    console.log("updateProduct error:", e.message);
    res.status(500);
    res.json({
      message: "Server error",
    });
  }
};

export const deletProduct = async (req, res) => {
  try {
    // since delete is findunique we require to index
    const deleted = await prisma.product.delete({
      where: {
        // id: req.params.id,
        // id_belongsToId: req.user.id
        // both works
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    res.json({
      data: deleted,
    });
  } catch (e) {
    console.log("deletProduct error:", e.message);
    res.status(500);
    res.json({
      message: "Server error",
    });
  }
};
