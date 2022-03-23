import "../styles/components/form.css";
import "../styles/pages/CreateRecipePage.css";
import * as Yup from "yup";
import axios from "axios";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";

const CreateRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().max(150, "Too Long!"),
  prep_time: Yup.number().positive("Time must be positive").integer(),
  category: Yup.string().max(50, "Too Long!"),
  source: Yup.string().max(50, "Too Long!"),
  instructions: Yup.string()
    .min(1, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  ingredients: Yup.string().min(1, "Too Short!").max(50, "Too Long!"),
  pic_url: Yup.string(),
});

const initialValues = {
  title: "",
  description: "",
  prep_time: 0,
  category: "",
  source: "",
  ingredients: [],
  instructions: "",
  pic_url: "",
};

function CreateRecipe(props) {
  const formRef = useRef();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { onPhone, setOnPhone } = props;

  function showUploadWidget() {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "diampwv1v",
        uploadPreset: "huj0ozoe",
        sources: [
          "url",
          "camera",
          "google_drive",
          "facebook",
          "dropbox",
          "instagram",
          "local",
          "image_search",
        ],
        // googleApiKeys "995847664969243",
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#232325",
            sourceBg: "#2F2F31",
            windowBorder: "#56606B",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#8A8A92",
            menuIcons: "#655A5A",
            link: "#808DC1",
            action: "#339933",
            inProgress: "#0433ff",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
          setWidgetLoading(false);
          if (info.event === "success") {
            const urlLink = info.info.url;

            setUrl(urlLink);
            // console.log(formRef);
            formRef.current.values.pic_url = urlLink;
          }
        }
      }
    );
  }

  return (
    <main id="crecipe-main">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateRecipeSchema}
        onSubmit={(values) => {
          const token = localStorage.getItem("token");
          const newValues = {
            category: values.category.trim(),
            description: values.description.trim(),
            ingredients,
            instructions: values.instructions.trim(),
            pic_url: url.trim(),
            prep_time: values.prep_time,
            source: values.source.trim(),
            title: values.title.trim(),
            token,
          };
          if (token) {
            axios
              .post(
                "https://secure-recipes-backend.herokuapp.com/api/recipes/create",
                newValues
              )
              .then((resp) => {
                navigate("/recipes");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
        innerRef={formRef}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <header className="form-header ec-header">
              <span className="ec-logo">
                <GiChefToque />
              </span>
              <h2 className="form-h2 ec-h2">Create Recipe</h2>
              {onPhone ? (
                <button
                  style={{ padding: "0 1rem", margin: "1rem 0" }}
                  onClick={() => {
                    navigate("/recipes");
                  }}
                >
                  Back
                </button>
              ) : null}
            </header>

            <div className="ec-main-cont">
              <div className="ec-main-col ec-main-col1">
                {url ? (
                  <img src={url} className="recipe-image" />
                ) : (
                  <div className="recipe-image-replacement">
                    <p>Photo Unavailable</p>
                  </div>
                )}
                <div className="ec-upload-cont">
                  <p className="form-p">Upload Photo:</p>

                  {widgetLoading ? (
                    <div
                      className="loader"
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "1.5rem",
                      }}
                    ></div>
                  ) : (
                    <button
                      type="button"
                      className="ec-up-btn"
                      onClick={() => {
                        setWidgetLoading(true);
                        showUploadWidget();
                      }}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>

              <div className="ec-main-col ec-main-col2">
                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Title:</p>
                    {errors.title && touched.title ? (
                      <p className="error-val">{errors.title}</p>
                    ) : null}
                  </div>
                  <Field
                    className="form-input ec-form-input"
                    name="title"
                    placeholder="Milkshake"
                  />
                </label>

                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Description:</p>
                    {errors.description && touched.description ? (
                      <div className="error-val">{errors.description}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input ec-form-input"
                    name="description"
                    placeholder="Blended milkshake"
                  />
                </label>

                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Prep Time:</p>
                    {errors.prep_time && touched.prep_time ? (
                      <div className="error-val">{errors.prep_time}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input ec-form-input"
                    name="prep_time"
                    type="number"
                    min="1"
                  />
                </label>

                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Category:</p>
                    {errors.category && touched.category ? (
                      <div className="error-val">{errors.category}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input ec-form-input"
                    name="category"
                    placeholder="Snack"
                  />
                </label>

                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Source:</p>
                    {errors.source && touched.source ? (
                      <div className="error-val">{errors.source}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input ec-form-input"
                    name="source"
                    placeholder="Family Recipe"
                  />
                </label>
              </div>

              <div className="ec-main-col ec-main-col3">
                <div className="ec-whole-ing-cont">
                  <label className="form-label">
                    <div className="ec-form-label-cont">
                      <p className="form-p">Ingredients:</p>
                    </div>
                    <div className="ec-ing-label-cont">
                      <button
                        type="button"
                        className="ec-ing-btn1"
                        onClick={() => {
                          let check = ingredients.indexOf(ingredient.trim());
                          if (ingredient && check === -1) {
                            setIngredients([...ingredients, ingredient.trim()]);
                          }
                        }}
                      >
                        +
                      </button>
                      <Field
                        id="ec-ing-input"
                        className="form-input ec-form-input"
                        name="ingredients"
                        placeholder="Banana, Milk, etc..."
                        onKeyUp={(e) => {
                          let value = e.target.value;
                          setIngredient(value.trim());
                        }}
                      />
                    </div>
                  </label>

                  <div className="ing-each-cont ">
                    {ingredients.map((ing, i) => {
                      return (
                        <div key={i}>
                          <button
                            type="button"
                            className="ec-ing-btn2"
                            onClick={() => {
                              let copy = [...ingredients];
                              copy.splice(i, 1);

                              setIngredients([...copy]);
                            }}
                          >
                            -
                          </button>
                          <Field
                            className="form-input ec-form-input ec-ing-each-input"
                            name={`ingredients-disabled`}
                            placeholder={ing}
                            disabled
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <label className="form-label">
                  <div className="ec-form-label-cont">
                    <p className="form-p">Instructions:</p>
                    {errors.instructions && touched.instructions ? (
                      <div className="error-val">{errors.instructions}</div>
                    ) : null}
                  </div>
                  <Field
                    id="ec-instructions-textarea"
                    className="form-input ec-form-input"
                    name="instructions"
                    placeholder="Prep, Blend, etc..."
                    as="textarea"
                  />
                </label>
              </div>
            </div>

            <div className="ec-submit-btn-cont">
              <button
                id="cr-btn"
                className="form-button btn-global ec-submit-btn"
                type="submit"
              >
                Create Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default CreateRecipe;
