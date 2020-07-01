import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import Testimonial from 'react-testimonial';
/* import { Slide } from 'react-slideshow-image'; */
/* import { TestimonialOne } from "../../components/Testimonial";
import testimonialOneData from "../../data/testimonials/testimonial-one.json"; */


import { Button, Loader, ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";



const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>      
      
      <div className="home-page__hero" style={ backgroundImage? { backgroundImage: `url(${backgroundImage.url})`}: null }>
        <div className="home-page__hero-text">
            <div>
              <span className="home-page__hero__title">
                <h1>Final reduction</h1>
              </span>
            </div>
            <div>
              <span className="home-page__hero__title">
                <h1>Up to 70% off sale</h1>
              </span>
            </div>
        </div>
        <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button>Shop sale</Button>
              </Link>
            )
          )}
        </div>
      </div>
      <ProductsFeatured />
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>Shop by category</h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id}>
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <div
                      className={classNames(
                        "home-page__categories__list__image",
                        {
                          "home-page__categories__list__image--no-photo": !category.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          category.backgroundImage
                            ? category.backgroundImage.url
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <h3>{category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ProductsFeatured />

      {/* Banner*/}
      <div className="home-page__banner">
        <div className="home-page__banner-text">
            <div>
              <span className="home-page__banner__title">
                <h3>Final reduction</h3>
              </span>
            </div>
            <div>
              <span className="home-page__banner__title">
                <h3>Up to 70% off sale</h3>
              </span>
            </div>
        </div>
      </div> 

      {/* testimonial */}
      <div className="test-heading">
        <h2>Testimonial</h2>
      </div>
      <Testimonial>
                <div className="card content mx-auto" >
                    <div className="card-body gp-cls">
                        <span className="txt-cnt">
                            I had the pleasure of working with him on an exciting project for over 18 months.<br></br>
                            We have shared some highs, lows and some real head scratching moments.<br></br>
                            He has been a real asset to the team and to me personally.
                        </span>
                        <p className="midlcls">-Abc</p>
                        <p className="desi-cls">CEO</p>
                    </div>
                </div>
                <div className="card content mx-auto" >
                    <div className="card-body gp-cls">
                        <span className="txt-cnt">
                            He has been a real asset to the team and able to pick up new technologies quickly.<br></br>
                            He has a passion for all flavours of development and is a team player with an excellent attitude both in and outside of work.
                        </span>
                        <p className="midlcls">-Xyz</p>
                        <p className="desi-cls">CEO</p>
                    </div>
                </div>
      </Testimonial>   

      
    </>
  );
};

export default Page;
