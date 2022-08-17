import { Fragment, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Headline, Subheadline } from "../../utils/Responsive";
import {
  getLatestProducts,
  clearLatestProducts,
} from "../../store/actions/products";
import { connect } from "react-redux";
import { Paper } from "@mui/material";
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";

const Latest = ({
  latest_products,
  getLatestProducts,
  clearLatestProducts,
}) => {
  useEffect(() => {
    clearLatestProducts();

    const timeout = setTimeout(() => {
      getLatestProducts();
    }, 200);

    return () => {
      clearLatestProducts();
      clearTimeout(timeout);
    };
  }, [clearLatestProducts, getLatestProducts]);

  //? Matijin Api response vraca duple proizvode. Ovako sam se ogradio
  const uniqueIds = [];
  const uniqueLatest = latest_products.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return (
    <Paper className="slider-section latest">
      <div className="slider-section-headline">
        <Headline
          sx={{
            fontWeight: "700",
            // fontFamily: "VerminVibesV",
            fontSize: "2.5rem !important",
          }}
        >
          Latest added
        </Headline>
        <Subheadline sx={{ fontWeight: "500 !important", fontSize: "1rem" }}>
          Explore our new products
        </Subheadline>
      </div>
      <Fragment>
        <ProductList product={latest_products} />
      </Fragment>
      {/* <Swiper
        spaceBetween={20}
        slidesPerView={4}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={false}
        navigation={true}
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ backgroundColor: "transparent" }}
      >
        {uniqueGames.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/products/${product.id}`} className="hvr-grow">
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 0,
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  src={product.media[0]?.media}
                  sx={{
                    objectFit: "center",
                    width: "303px !important",
                    height: "373px !important",
                  }}
                />

                <CardContent
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                    position: {
                      xs: "absolute",
                    },
                    width: "100%",
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: {
                      xs: "white",
                      md: "red",
                    },
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="info"
                    sx={{ fontSize: "1.2rem!important" }}
                  >
                    {product.name.slice(0, 30)}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {product.content.slice(0, 30)}
                  </Typography>

                  {/* <CardActions sx={{ paddingLeft: 0 }}>
                    <Button size="small" color="success" variant="contained">
                      Buy Now
                    </Button>
                  </CardActions> */}
      {/* </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper> */}{" "}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  latest_products: state.products.latest_products,
});

export default connect(mapStateToProps, {
  getLatestProducts,
  clearLatestProducts,
})(Latest);
