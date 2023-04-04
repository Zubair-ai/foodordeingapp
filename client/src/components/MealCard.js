import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropDown from "./UI/DropDown";
import { Box, display } from "@mui/system";
import { useCart, useDispatch } from "../Store/UseContext";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  foodname,
  image,
  description,
  options,
  id,
}) {
  // dispatching data through usedispatchContex
  const dispatch = useDispatch();
  const Data=useCart();
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState('');
  const propertykeys = Object.keys(options[0]);
  const propertyValues = Object.values(options[0]);
  const onClickHandler = async (event) => {
    
    let food = []
    for (const item of Data) {
      if (item.id === id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: id, name: foodname, price: finalPrice, qty: qty, size: size,img: image })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    
    
    
    
    await dispatch({
      type: "ADD",
      name: foodname,
      image: image,
      id: id,
      qty: qty,
      size: size,
      price:finalPrice
    });
    console.log(Data)
    
  };
  let finalPrice;
  if(size===''){
     const initialkeys=propertykeys[0]
    finalPrice=qty*(options[0][initialkeys]);
  }
  if(size !== "")
   {finalPrice=qty*(options[0][size])};
  
  return (
    <Card sx={{ maxWidth: 345, m: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={foodname}
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", columnGap: "8px" }}>
            <div className="conatanier w-50">
              <select className="bg-danger" onChange={(e)=>{setQty(e.target.value)}}>
                {Array.from(Array(6)).map((_, index) => (
                  <option value={index + 1} key={index + 1}>{index + 1}</option>
                ))}
              </select>
            </div>

            <div className="conatanier w-50">
              <select className="bg-danger"   onChange={(event)=>{setSize(event.target.value)}} >
                {propertykeys.map((index) => (
                  <option className="bg-danger" value={index } key={index}>{index}</option>
                ))}
              </select>
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
            <Typography> Prince: ${finalPrice}/-</Typography>
          </Box>
        </Box>
        <hr />
        <button className="rounded" onClick={onClickHandler} color="inherit">
          Add to Cart
        </button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
