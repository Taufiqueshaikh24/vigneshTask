// router.post("/share/:fileId", async (req, res) => {
//     try {
//       const { password } = req.body;
//       const { fileId } = req.params;
  
//       // Hash the password before saving
//     //   const salt = await bcrypt.genSalt(10);
//     //   const sharedPasswordHash = await bcrypt.hash(password, salt);
  
//       // Update file with the new password
//       const updatedFile = await File.findByIdAndUpdate(fileId, { sharedPasswordHash }, { new: true });
  
//       if (!updatedFile) return res.status(404).json({ message: "File not found" });
  
//       res.status(200).json({ message: "Password set successfully for sharing", file: updatedFile });
//     } catch (error) {
//       res.status(500).json({ message: "Error setting password", error });
//     }
//   });
  