import React, { Fragment, useEffect, useState } from "react";
import "./QRcode.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { Button, Hidden } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {QRCodeSVG} from 'qrcode.react';
import qs from 'qs'
import AcUnitIcon from '@mui/icons-material/AcUnit';
const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();
  
  const { loading, error, success } = useSelector((state) => state.createProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [exprire_date, setExprireDate] = useState();
  const [idproduct, setId] = useState("");

  const productInfo = {
    name: name,
    price: price,
    description: description,
    exprire_date:exprire_date,
    image:images,
  
    idproduct: idproduct,
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);



  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            
      
          >
            <h1>Thêm sản phẩm mới</h1>
         
            <div>
            <AcUnitIcon/>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Mã SP"
                required
                value={idproduct}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
           
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>


            <div>
                
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Giá"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
            
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Hạn sử dụng"
                required
                value={exprire_date}
                onChange={(e) => setExprireDate(e.target.value)}
              />
            </div>
            
          
          <div>
              <DiscountIcon />
              <textarea
                type="text"
                placeholder="Hình ảnh"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />
          
            </div>

            <div>
              <DiscountIcon />
              <input
                type="text"
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
          
            </div>

           
          
          

              
             <div>
       
          
            </div>
        

         
            
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Tạo mới
            </Button>
      
          </form>

          <QRCodeSVG  className="qr-scanner-result" value={`https://main--majestic-entremet-52c646.netlify.app/?${qs.stringify(productInfo)}`} />
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
  );
};

export default CreateProduct;