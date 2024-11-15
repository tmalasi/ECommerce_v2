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
      padding="40px"
    >
      <form className="form-handler" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          placeholder="Title"
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />

        <TextField
          type="number"
          placeholder="Price"
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
        />

        <TextField
          placeholder="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description", { required: "Description is required" })}
        />

        <TextField
          type="text"
          placeholder="Image URL"
          error={!!errors.image}
          helperText={errors.image?.message}
          {...register("image", { required: "Image URL is required" })}
        />

        <Button type="submit" variant="contained" className="updateBtn">
          {mode === "Add" ? "Add Product" : "Edit Product"}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProductForm;
