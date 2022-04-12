import * as Yup from "yup";
import axios from "axios";
import main from "../assets/main.svg";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import "../styles/pages/CreateRecipePage.css";

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
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_UPLOADPRESET,
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
    <main id="create-recipe-main">
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
          <Form id="create-recipe-form" className="ce-forms">
            <header>
              <img alt="svg" src={main} />
              <h2>Create Recipe</h2>
              {onPhone ? (
                <button
                  onClick={() => {
                    navigate("/recipes");
                  }}
                >
                  Back
                </button>
              ) : null}
            </header>

            <div className="inputs-container">
              <div className="first-col">
                <div className="photo-cont">
                  {url ? <img src={url} /> : <p>Photo Unavailable</p>}
                </div>

                <div className="upload-btn-cont">
                  <p>Upload Photo:</p>

                  {widgetLoading ? (
                    <div className=""></div>
                  ) : (
                    <button
                      className="recipe-btn"
                      type="button"
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

              <div className="mid-col">
                <label>
                  <div className="title-err-cont">
                    <p>Title:</p>
                    {errors.title && touched.title ? (
                      <p>{errors.title}</p>
                    ) : null}
                  </div>
                  <Field name="title" placeholder="Milkshake" />
                </label>

                <label>
                  <div className="title-err-cont">
                    <p>Description:</p>
                    {errors.description && touched.description ? (
                      <div className="">{errors.description}</div>
                    ) : null}
                  </div>
                  <Field name="description" placeholder="Blended milkshake" />
                </label>

                <label>
                  <div className="title-err-cont">
                    <p>Prep Time:</p>
                    {errors.prep_time && touched.prep_time ? (
                      <div className="">{errors.prep_time}</div>
                    ) : null}
                  </div>
                  <Field name="prep_time" type="number" min="1" />
                </label>

                <label>
                  <div className="title-err-cont">
                    <p>Category:</p>
                    {errors.category && touched.category ? (
                      <div className="">{errors.category}</div>
                    ) : null}
                  </div>
                  <Field name="category" placeholder="Snack" />
                </label>

                <label>
                  <div className="title-err-cont">
                    <p>Source:</p>
                    {errors.source && touched.source ? (
                      <div className="">{errors.source}</div>
                    ) : null}
                  </div>
                  <Field name="source" placeholder="Family Recipe" />
                </label>
              </div>

              <div className="last-col">
                <label id="ing-cont">
                  <div className="title-err-cont">
                    <p>Ingredients:</p>
                  </div>

                  <div className="add-ing-cont">
                    <button
                      className="add-min-btn"
                      type="button"
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
                      name="ingredients"
                      placeholder="Banana, Milk, etc..."
                      onKeyUp={(e) => {
                        let value = e.target.value;
                        setIngredient(value.trim());
                      }}
                    />
                  </div>
                </label>

                <div className="disable-btn-cont">
                  {ingredients.map((ing, i) => {
                    return (
                      <div className="del-ing-cont" key={i}>
                        <button
                          className="add-min-btn"
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
                          name={`ingredients-disabled`}
                          placeholder={ing}
                          disabled
                        />
                      </div>
                    );
                  })}
                </div>

                <label id="inst-cont">
                  <div className="title-err-cont">
                    <p>Instructions:</p>

                    {errors.instructions && touched.instructions ? (
                      <div className="">{errors.instructions}</div>
                    ) : null}
                  </div>
                  <Field
                    name="instructions"
                    placeholder="Prep, Blend, etc..."
                    as="textarea"
                  />
                </label>
              </div>
            </div>

            <div className="btn-cont">
              <button className="recipe-btn" type="submit">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default CreateRecipe;
