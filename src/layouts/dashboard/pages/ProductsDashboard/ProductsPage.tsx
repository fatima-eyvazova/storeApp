import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { CiCircleRemove } from "react-icons/ci";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} from "../../../../redux/slices/shared/apiSlice";
import AddProduct from "../../components/Products/AddProduct/AddProduct";
import ProductsTable from "../../components/Products/ProductsTable/ProductsTable";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";

const ProductsDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const { data: productsData, refetch } = useGetProductsQuery({
    page,
    perPage,
  });

  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (productsData) {
      setList(productsData.data);
    }
  }, [productsData]);

  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.target.value.toLowerCase();
    setSearchInput(inputValue);
  };

  const handleResetButtonClick = () => {
    setSearchInput("");
    setSelectedBrand("");
    refetch();
  };

  const handleDeleteSelectedItems = () => {
    setOpenDeleteModal(true);
  };

  const handleOrderChange = (orderBy: "asc" | "disc") => {
    const sorted =
      orderBy === "asc"
        ? [...list].sort((a, b) => Number(a.salePrice) - Number(b.salePrice))
        : [...list].sort((a, b) => Number(b.salePrice) - Number(a.salePrice));
    setList(sorted);
  };

  const handleAddProduct = async (productData) => {
    await addProduct(productData).unwrap();
    refetch();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
    refetch();
  };
  const totalCount = productsData?.data?.product?.length || 0;

  return (
    <>
      <div className="products-dashboard">
        <div className="products-top">
          <h1>Products</h1>
          <div className="delete-add">
            <button className="delete" onClick={handleDeleteSelectedItems}>
              <RiDeleteBin6Line />
              <span className="text-delete">Delete</span>
            </button>
            <button className="add" onClick={toggleDrawer}>
              <IoAddOutline />
              <span className="text-add">Add Product</span>
              <Drawer
                anchor="right"
                open={open}
                onClose={closeDrawer}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CiCircleRemove
                  style={{
                    fontSize: "24px",
                    position: "absolute",
                    right: "50px",
                    top: "30px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={closeDrawer}
                />
                <AddProduct setOpen={setOpen} onAddProduct={handleAddProduct} />
              </Drawer>
            </button>
          </div>
          <div className="products-filter">
            <input
              type="text"
              placeholder="Search Product"
              className="input-search"
              value={searchInput}
              onChange={searchProduct}
            />
            <select
              className="brand"
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select brand
              </option>
              {Array.isArray(categoriesData) &&
                categoriesData.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
            </select>
            <select
              className="price"
              onChange={(e) => {
                handleOrderChange(e.target.value as "asc" | "disc");
              }}
            >
              <option value="" disabled selected>
                Select Order
              </option>
              <option value="asc">Low to High</option>
              <option value="disc">High to Low</option>
            </select>
            <div className="filter-reset">
              <button className="filter-btn">Filter</button>
              <button className="reset-btn" onClick={handleResetButtonClick}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="products-table">
          <ProductsTable
            list={productsData?.data?.product || []}
            selectedBrand={selectedBrand}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onDeleteProduct={handleDeleteProduct}
            setPage={setPage}
            totalCount={totalCount}
            setPerPage={setPerPage}
            page={page}
            perPage={perPage}
            refetch={refetch}
          />
        </div>
      </div>
      {openDeleteModal && (
        <DeleteModal
          setOpenModal={setOpenDeleteModal}
          onDelete={handleDeleteProduct}
          itemIdList={selectedItems}
          resource="products"
        />
      )}
    </>
  );
};

export default ProductsDashboard;
