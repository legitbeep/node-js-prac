import prisma from "../db";

export const getAllUpdates = async (req, res) => {
  try {
    // use find many to find all updates of user
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.productId,
          belongsToId: req.user.id,
        },
      },
      include: {
        updates: true,
      },
    });

    if (!product) throw new Error("No product found!");

    res.json({
      data: product.updates,
    });
  } catch (e) {
    console.log("getAllUpdates Error:", e.message);
    res.status(500);
    res.json({
      message: "Server Error",
    });
  }
};

export const getUpdateById = async (req, res) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      data: update,
    });
  } catch (e) {
    console.log("getUpdateById Error:", e.message);
    res.status(500);
    res.json({
      message: "Server Error",
    });
  }
};

export const createUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.productId,
          belongsToId: req.user.id,
        },
      },
    });
    if (!product) {
      throw new Error("Unauthorized");
    }
    const newUpdate = await prisma.update.create({
      data: {
        updatedAt: new Date().toISOString(), // shouldve defaulted in db
        title: req.body.title,
        body: req.body.body,
        productId: product.id,
      },
    });
    res.json({
      data: newUpdate,
    });
  } catch (e) {
    console.log("createUpdate Error:", e.message);
    res.status(500);
    res.json({
      message: "Server Error",
    });
  }
};

export const updateUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.productId,
          belongsToId: req.user.id,
        },
      },
    });
    if (!product) {
      throw new Error("No product found!");
    }
    const updatedRes = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: {
        updatedAt: new Date().toISOString(), // shouldve defaulted in db
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
      },
    });
    if (!updatedRes) {
      throw new Error("No update found!");
    }
    res.json({
      data: updatedRes,
    });
  } catch (e) {
    console.log("updateUpdate Error:", e.message);
    res.status(500);
    res.json({
      message: "Server Error",
    });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.productId,
      },
    });
    const deletedUpdate = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      data: deletedUpdate,
    });
  } catch (e) {
    console.log("deleteUpdate Error:", e.message);
    res.status(500);
    res.json({
      message: "Server Error",
    });
  }
};
