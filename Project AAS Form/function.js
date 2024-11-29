let autoincrement = 1;
let productArray = [];
const productTable = document.getElementById("productTable");
let currentEditIndex = null;

function saveFrom() {
  const nameProduk = document.getElementById("nameProduk").value;
  const harga = document.getElementById("itemPrice").value;
  const packaging = document.getElementById("itemPackaging").value;
  const itemCategory = document.getElementById("itemCategory").value;
  const itemImageUrl = document.getElementById("itemImageUrl").value;
  const stokawal = document.getElementById("stokawal").value;

  if (currentEditIndex !== null) {
    productArray[currentEditIndex] = {
      kodeproduk: productArray[currentEditIndex].kodeproduk, // buat si kode produk tetep nomernya pas diedit *om radit
      nameProduk,
      harga,
      packaging,
      itemCategory,
      itemImageUrl,
      stokawal: Number(stokawal),
    };
    currentEditIndex = null;
  } else {
    const kodeproduk = "MD-0" + autoincrement++;
    productArray.push({
      kodeproduk,
      nameProduk,
      harga,
      packaging,
      itemCategory,
      itemImageUrl,
      stokawal: Number(stokawal),
    });
  }

  renderTable();
  document.getElementById("kodeproduk").value = "MD-0" + autoincrement;
}

function renderTable() {
  const tablebody = productTable.getElementsByTagName("tbody")[0];
  let rownumber = 1;
  validate_kategory = tablebody.innerHTML = "";
  productArray.forEach((product) => {
    const row = tablebody.insertRow();
    row.innerHTML = `
      <tr id="${product.kodeproduk}">
        <td>${rownumber++}</td>
        <td>${product.kodeproduk}</td>
        <td>${product.nameProduk}</td>
        <td>${product.harga}</td>
        <td>${product.packaging}</td>
        <td>${product.itemCategory}</td>
        <td><img src="${
          product.itemImageUrl
        }" alt="Product Image" style="width: 100px; height: auto;"></td>
        <td>${product.stokawal}</td>
        <td>
          <button class="edit" onclick="editProduct('${
            product.kodeproduk
          }')">Edit</button>
          <button class="delete" onclick="deleteProduct('${
            product.kodeproduk
          }')">Delete</button>
        </td>
      </tr>
    `;
    tablebody.appendChild(row);
    if (product.stokawal < 5) {
      const simerah = row.cells[7];
      simerah.classList.add("low-stock");
    }
  });
}

function deleteProduct(kodeproduk) {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    productArray = productArray.filter(
      (product) => product.kodeproduk !== kodeproduk
    );
    renderTable();
  }
}

function editProduct(kodeproduk) {
  const product = productArray.find((p) => p.kodeproduk === kodeproduk);
  if (product) {
    document.getElementById("kodeproduk").value = product.kodeproduk;
    document.getElementById("nameProduk").value = product.nameProduk;
    document.getElementById("itemPrice").value = product.harga;
    document.getElementById("itemPackaging").value = product.packaging;
    document.getElementById("itemCategory").value = product.itemCategory;
    document.getElementById("itemImageUrl").value = product.itemImageUrl;
    document.getElementById("stokawal").value = product.stokawal;
    currentEditIndex = productArray.indexOf(product);
  }
}

document.getElementById("kodeproduk").value = "MD-0" + autoincrement;
