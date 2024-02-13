// import React, { useState } from "react";

// export const AddPost = ({ isOpen, onClose }) => {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSubmit = () => {
//     // Handle the submission logic here
//     console.log("Submitting post:", { text, file });

//     // Close the modal after submission
//     onClose();
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Add Post</h2>
//             <textarea
//               placeholder="Write your post..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <input type="file" />
//             <button onClick={handleSubmit}>Post</button>
//             <button onClick={() => onClose()}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
