const storageHelper = {
  getStudents() {
    const result = localStorage.getItem("students");
    return result ? JSON.parse(result) : [];
  },

  saveStudents(students, download = false) {
    try {
      localStorage.setItem("students", JSON.stringify(students));
      if (download) downloadJSON(students, "students.json");
      return true;
    } catch (error) {
      console.error("Error saving students:", error);
      return false;
    }
  },

  getPurchases() {
    const result = localStorage.getItem("purchases");
    return result ? JSON.parse(result) : [];
  },

  savePurchases(purchases, download = false) {
    try {
      localStorage.setItem("purchases", JSON.stringify(purchases));
      if (download) downloadJSON(purchases, "purchases.json");
      return true;
    } catch (error) {
      console.error("Error saving purchases:", error);
      return false;
    }
  },

  getFeast() {
    const result = localStorage.getItem("currentFeast");
    return result ? JSON.parse(result) : { isSet: false, price: 40 };
  },

  saveFeast(feast, download = false) {
    try {
      localStorage.setItem("currentFeast", JSON.stringify(feast));
      if (download) downloadJSON(feast, "currentFeast.json");
      return true;
    } catch (error) {
      console.error("Error saving feast:", error);
      return false;
    }
  },
};

function downloadJSON(data, filename = "data.json") {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default storageHelper;