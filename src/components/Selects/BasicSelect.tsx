import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { categoryService } from "../../services/categories";
import { Category } from "../../services/types/Category";

interface BasicSelectProps {
  onChange: (event: SelectChangeEvent<string>) => void;
  categories?: Category[]; // Altere para categories se preferir
}

export default function BasicSelect({
  onChange,
  categories,
}: BasicSelectProps) {

  if (categories == null) {
    categories = categoryService.categoriesMock;
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={onChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
