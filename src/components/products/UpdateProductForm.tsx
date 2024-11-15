import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { NewProduct, UpdateProduct } from "../../interfaces/ProductInterface";

const UpdateProductForm: React.FC<UpdateProduct> = ({
  onProductUpdate,
  product,
  mode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProduct>({
    defaultValues: product,
  });

  const onSubmit = (data: NewProduct) => {
    onProductUpdate(data);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <TextField
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
        />
        {errors.price && <p>{errors.price.message}</p>}

        <TextField
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <TextField
          type="text"
          placeholder="Image URL"
          {...register("image", { required: "Image URL is required" })}
        />
        {errors.image && <p>{errors.image.message}</p>}

        <Button type="submit" variant="contained" className="updateBtn">
          {mode === "Add" ? "Add Product" : "Edit Product"}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProductForm;
