import * as Yup from "yup";
import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { RecipeContext } from "../RecipeContext";
import { GiChefToque } from "react-icons/gi";
import "../styles/components/form.css";
import "../styles/pages/EditRecipePage.css";

const EditRecipeSchema = Yup.object().shape({
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

function EditRecipe(props) {
  const formRef = useRef();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [url, setUrl] = useState("");
  const [widgetLoading, setWidgetLoading] = useState(false);
  const { id } = useParams();
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);
  const [serverError, setServerError] = useState("");
  const {
    displayLeft,
    setDisplayLeft,
    displayRight,
    setDisplayRight,
    onPhone,
    setOnPhone,
  } = props;

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
            formRef.current.values.pic_url = urlLink;
          }
        }
      }
    );
  }

  useEffect(() => {
    // setIngredients(selectedRecipe.ingredients.split(","));
    setUrl(selectedRecipe.pic_url);
    setIngredients(selectedRecipe.ingredients);
  }, []);

  return (
    <main id="edit-recipe-main">
      <Formik
        initialValues={{
          title: selectedRecipe.title,
          description: selectedRecipe.description,
          prep_time: selectedRecipe.prep_time,
          category: selectedRecipe.category,
          source: selectedRecipe.source,
          ingredients: "",
          instructions: selectedRecipe.instructions,
          pic_url: selectedRecipe.pic_url,
        }}
        validationSchema={EditRecipeSchema}
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
              .put(
                `https://secure-recipes-backend.herokuapp.com/api/recipes/edit/${id}`,
                newValues
              )
              .then((resp) => {
                navigate("/recipes");
                setDisplayLeft(true);
                setDisplayRight(false);
              })
              .catch((err) => {
                const errFromServer = err.response.data.message;
                setServerError(errFromServer);
              });
          }
        }}
        innerRef={formRef}
      >
        {({ errors, touched }) => (
          <Form id="edit-recipe-form" className="ce-forms">
            <header>
              <span>
                <GiChefToque />
              </span>

              <h2>Edit Recipe</h2>

              {onPhone ? (
                <button
                  onClick={() => {
                    navigate("/recipes");
                    setDisplayLeft(true);
                    setDisplayRight(false);
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

                  <div className="disable-btn-cont">
                    {ingredients.map((ing, i) => {
                      return (
                        <div className="del-ing-cont" key={i}>
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
                            name={`ingredients-disabled`}
                            placeholder={ing}
                            disabled
                          />
                        </div>
                      );
                    })}
                  </div>
                </label>

                <label id="inst-cont">
                  <div className="title-err-cont">
                    <p>Instructions:</p>

                    {errors.instructions && touched.instructions ? (
                      <div>{errors.instructions}</div>
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
              <button type="submit">Edit Recipe</button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default EditRecipe;
