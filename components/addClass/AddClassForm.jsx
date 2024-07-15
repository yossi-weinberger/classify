"use client";
import { useState } from "react";
import styles from "./AddClassForm.module.css";
import { addClass } from "@/functions/apiCalls";

export default function AddClassForm() {
  const [formData, setFormData] = useState({
    className: "",
    teacher: "",
    img: "https://res.cloudinary.com/df4ysoodx/image/upload/v1721035122/fmvvwja3emakk7ktgb1d.jpg",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addClass(formData);
      setSuccess(`כיתה ${formData.className} נוספה בהצלחה!`);
      setFormData({
        className: "",
        teacher: "",
      });
    } catch (error) {
      console.error("Error adding Class:", error);
      setError(error.message || "An error occurred while adding the Class.");
    }
  };

  const fieldLabels = {
    className: "כיתה",
    teacher: "מורה",
  };

  const fieldOrder = ["className", "teacher"];

  const renderField = (field) => {
    const value = formData[field];
    const label = fieldLabels[field];

    return (
      <div key={field} className={styles.inputGroup}>
        <label htmlFor={field}>{label}</label>
        <input
          id={field}
          name={field}
          value={value}
          onChange={handleChange}
          placeholder={label}
          type="text"
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
      <button type="submit" className={styles.submitButton}>
        הוסף כיתה
      </button>
    </form>
  );
}

// "use client";
// import { useState } from "react";
// import styles from "./AddClassForm.module.css";
// import { addClass, uploadImage } from "@/functions/apiCalls";
// import Image from "next/image";

// export default function AddClassForm() {
//   const [formData, setFormData] = useState({
//     className: "",
//     teacher: "",
//     // img: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // let imageUrl = formData.img;
//       if (selectedFile) {
//         imageUrl = await uploadImage(selectedFile);
//       }

//       // const updatedFormData = {
//       //   ...formData,
//       //   idil: Number(formData.idil),
//       //   img: imageUrl,
//       // };

//       const result = await addClass(updatedFormData);

//       setSuccess(`כיתה ${formData.className}  נוספה בהצלחה!`);
//       setFormData({
//         className: "",
//         teacher: "",
//         // img: "",
//       });
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Error adding Class:", error);
//       setError(error.message || "An error occurred while adding the Class.");
//     }
//   };

//   const fieldLabels = {
//     className: "כיתה",
//     teacher: "מורה",
//     // img: "תמונה",
//   };

//   const fieldOrder = ["className", "teacher"];

//   const renderField = (field) => {
//     // if (field === "img") {
//     //   return (
//     //     <div key={field} className={styles.inputGroup}>
//     //       <label htmlFor="imageUpload">{fieldLabels[field]}</label>
//     //       <div className={styles.fileInputWrapper}>
//     //         <input
//     //           type="file"
//     //           id="imageUpload"
//     //           onChange={handleFileChange}
//     //           accept="image/*"
//     //           className={styles.fileInput}
//     //         />
//     //         <span className={styles.fileInputText}>
//     //           {selectedFile ? selectedFile.name : "בחר קובץ"}
//     //         </span>
//     //         <Image
//     //           src="/icons/upload.svg"
//     //           alt="Upload icon"
//     //           width={20}
//     //           height={20}
//     //           className={styles.uploadIcon}
//     //         />
//     //       </div>
//     //     </div>
//     //   );
//     // }
//     const [parent, child] = field.split(".");
//     const value = child ? formData[parent][child] : formData[field];
//     const label = fieldLabels[field];

//     return (
//       <div key={field} className={styles.inputGroup}>
//         <label htmlFor={field}>{label}</label>

//         <input
//           id={field}
//           name={field}
//           value={value}
//           onChange={handleChange}
//           placeholder={label}
//           type={field === "dateOfBirth" ? "date" : "text"}
//         />
//       </div>
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       {error && <div className={styles.error}>{error}</div>}
//       {success && <div className={styles.success}>{success}</div>}
//       {/* {renderField("idil")} */}
//       <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
//       <button type="submit" className={styles.submitButton}>
//         הוסף כיתה
//       </button>
//     </form>
//   );
// }
