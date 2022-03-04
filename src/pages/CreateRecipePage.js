import "../styles/components/form.css";
import "../styles/pages/CreateRecipePage.css";
import * as Yup from "yup";
import axios from "axios";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const CreateRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().max(150, "Too Long!"),
  prep_time: Yup.number()
    .positive("Prep time must be a positive number")
    .integer(),
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

function CreateRecipe() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [url, setUrl] = useState("");

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
            window: "#464040",
            sourceBg: "#292222",
            windowBorder: "#c7a49f",
            tabIcon: "#cc6600",
            inactiveTabIcon: "#E8D5BB",
            menuIcons: "#ebe5db",
            link: "#ffb107",
            action: "#ffcc00",
            inProgress: "#99cccc",
            complete: "#78b3b4",
            error: "#ff6666",
            textDark: "#4C2F1A",
            textLight: "#D8CFCF",
          },
          fonts: {
            default: null,
            "'Merriweather', serif": {
              url: "https://fonts.googleapis.com/css?family=Merriweather",
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
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
          const newValues = { ...values, ingredients, token, pic_url: url };
          console.log(newValues);
          if (token) {
            axios
              .post("http://localhost:9000/api/recipes/create", newValues)
              .then((resp) => {
                console.log(resp);
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
            <header className="form-header">
              <h2 className="form-h2">Create Recipe</h2>
            </header>
            <hr
              style={{
                borderTop: "1px solid black",
                borderLeft: "none",
                borderRight: "none",
                width: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div>
                  {url ? (
                    <img src={url} className="recipe-image" />
                  ) : (
                    <div className="recipe-image-replacement">
                      <p>Photo Unavailable</p>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem",
                  }}
                >
                  <p className="form-p">Upload Photo:</p>
                  <button
                    type="button"
                    onClick={() => {
                      showUploadWidget();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div style={{ width: "32%" }}>
                <label className="form-label">
                  <div>
                    <p className="form-p">Title:</p>
                    {errors.title && touched.title ? (
                      <p className="error-val">{errors.title}</p>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="title"
                    placeholder="Milkshake"
                  />
                </label>

                <label className="form-label">
                  <div>
                    <p className="form-p">Description:</p>
                    {errors.description && touched.description ? (
                      <div className="error-val">{errors.description}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="description"
                    placeholder="Blended milkshake"
                  />
                </label>

                <label className="form-label">
                  <div>
                    <p className="form-p">Prep Time:</p>
                    {errors.prep_time && touched.prep_time ? (
                      <div className="error-val">{errors.prep_time}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="prep_time"
                    type="number"
                    min="1"
                  />
                </label>

                <label className="form-label">
                  <div>
                    <p className="form-p">Category:</p>
                    {errors.category && touched.category ? (
                      <div className="error-val">{errors.category}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="category"
                    placeholder="Snack"
                  />
                </label>

                <label className="form-label">
                  <div>
                    <p className="form-p">Source:</p>
                    {errors.source && touched.source ? (
                      <div className="error-val">{errors.source}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="source"
                    placeholder="Family Recipe"
                  />
                </label>
              </div>

              <div style={{ width: "32%" }}>
                <label className="form-label">
                  <div>
                    <p className="form-p">Instructions:</p>
                    {errors.instructions && touched.instructions ? (
                      <div className="error-val">{errors.instructions}</div>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="instructions"
                    placeholder="Prep, Blend, etc..."
                  />
                </label>

                <label className="form-label">
                  <div>
                    <p className="form-p">Ingredients:</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        let check = ingredients.indexOf(ingredient);
                        if (ingredient && check === -1) {
                          setIngredients([...ingredients, ingredient]);
                        }
                      }}
                    >
                      +
                    </button>
                    <Field
                      style={{ width: "80%" }}
                      className="form-input"
                      name="ingredients"
                      placeholder="Banana, Milk, etc..."
                      onKeyUp={(e) => {
                        let value = e.target.value;
                        setIngredient(value);
                      }}
                    />
                  </div>
                </label>

                <hr />

                <div className="ing-each-cont">
                  {ingredients.map((ing, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "1rem 0",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            let copy = [...ingredients];
                            copy.splice(i, 1);

                            setIngredients([...copy]);
                          }}
                        >
                          -
                        </button>
                        <Field
                          style={{ width: "80%" }}
                          className="form-input"
                          name={`ingredients-disabled`}
                          placeholder={ing}
                          disabled
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                id="cr-btn"
                className="form-button btn-global"
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
