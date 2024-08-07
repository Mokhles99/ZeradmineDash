import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProducts, getProductById, updateProduct, deleteProduct } from '../../actions/product.actions';
import { getAllCarts, getCarttwo } from '../../actions/carttwo.actions';
import { fetchAllUsers } from '../../actions/users.actions';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RoleSelector from './RoleSelector';
import Tooltip from '@mui/material/Tooltip';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f0f8ff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};

const titleStyle = {
    fontWeight: 'bold',
    color: '#000',
};

const labelStyle = {
    color: '#000',
    fontWeight: 'bold',
};

const valueStyle = {
    color: '#808080',
};

const productTypeMapping = {
    'Outils manuel': ['Tournevis', 'Marteaux', 'Pinces', 'Clés', 'Scies', 'Mesures'],
    'Outils electrique': ['Interrupteurs', 'Prises de courant', 'Câbles électriques', 'Lampes et luminaires', 'Disjoncteur', 'Boîtes de jonction'],
    'Outils de jardin': ['Tondeuses à gazon', 'Taille-haies', 'Brouettes', 'Arrosoirs'],
    'Quincaillerie de fixation': ['Vis', 'Clous', 'Boulons', 'Écrous', 'Crochets', 'Chevilles', 'Rivet', 'Goujons d\'ancrage'],
    'Quincaillerie de menuiserie': ['Poignées', 'Serrures', 'Charnières', 'Verrous'],
    'Plomberie': ['Robinets', 'Raccords', 'Collecteurs', 'Tuyaux', 'Éviers', 'Toilettes', 'Douches', 'Siphons'],
    'Peinture': ['Peinture et décoration', 'Pinceaux et Rouleaux', 'Rubans de masquage', 'Bâches de protection', 'Diluants et solvants', 'Mastics et enduits'],
    'Équipement de securite': ['Casques', 'Lunettes', 'Gants', 'Vêtements'],
    'Outils de construction': ['Plâtre', 'Ciment', 'Étanchéité']
};

const productFamilies = Object.keys(productTypeMapping);

const Tables = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const productDetail = useSelector(state => state.product.product);
    const carts = useSelector(state => state.carttwo.carts);
    const cartDetail = useSelector(state => state.carttwo.carttwo);
    const users = useSelector(state => state.user.users);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editProductModalOpen, setEditProductModalOpen] = useState(false);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [selectedCartId, setSelectedCartId] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productConfirmOpen, setProductConfirmOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [editProductData, setEditProductData] = useState({ name: '', description: '', files: [] });
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productFamille, setProductFamille] = useState('');
    const [productType, setProductType] = useState('');
    const [productFiles, setProductFiles] = useState([]);

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('type', productType);
        formData.append('price', productPrice);
        formData.append('famille', productFamille);
        for (let file of productFiles) {
            formData.append('files', file);
        }

        try {
            const response = await fetch('https://admin.szq.tn/product/create', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log('Product added successfully', result);
            setAddProductModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCarts());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProductId) {
            dispatch(getProductById(selectedProductId));
        }
    }, [dispatch, selectedProductId]);

    useEffect(() => {
        if (selectedCartId) {
            console.log('Selected cart ID:', selectedCartId); 
            dispatch(getCarttwo(selectedCartId));
        }
    }, [dispatch, selectedCartId]);

    useEffect(() => {
        if (productDetail) {
            setEditProductData({
                name: productDetail.name,
                description: productDetail.description,
                type: productDetail.type,
                famille: productDetail.famille,
                files: productDetail.files || []
            });
        }
    }, [productDetail]);

    const handleOpen = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const handleClose = () => {
        setOpen(false);
        setConfirmOpen(false);
        setEditOpen(false);
        setProductModalOpen(false);
        setEditProductModalOpen(false);
        setCartModalOpen(false);
        setSelectedId(null);
        setSelectedProductId(null);
        setSelectedCartId(null);
    };

    const handleDeleteClick = (id) => {
        setConfirmOpen(true);
        setSelectedId(id);
    };

    const handleProductDeleteConfirm = (productId) => {
        setProductConfirmOpen(true);
        setSelectedProductId(productId);
    };

    const handleProductDelete = () => {
        if (selectedProductId) {
            dispatch(deleteProduct(selectedProductId));
            setProductConfirmOpen(false);
            setSelectedProductId(null);
        }
    };

    const handleEditClick = (id) => {
        setEditOpen(true);
        setSelectedId(id);
    };

    const handleProductEditClick = (productId) => {
        const product = products.find(p => p._id === productId);
        setSelectedProductId(productId);
        setEditProductData({
            name: product.name,
            description: product.description,
            files: product.files.map(file => file.url)
        });
        setEditProductModalOpen(true);
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEditProductData(prevState => ({ ...prevState, files: [...e.target.files] }));
    };

    const handleSaveEditProduct = () => {
        const formData = new FormData();
        if (editProductData.name && editProductData.description && editProductData.type) {
            formData.append('name', editProductData.name);
            formData.append('description', editProductData.description);
            formData.append('type', editProductData.type);
            formData.append('famille', editProductData.famille);
            formData.append('price', editProductData.price);
            editProductData.files.forEach(file => {
                formData.append('files', file);
            });

            dispatch(updateProduct(selectedProductId, editProductData));
            setEditProductModalOpen(false);
        } else {
            console.error("One or more fields are undefined");
        }
    };

    const handleProductViewOpen = (productId) => {
        setSelectedProductId(productId);
        dispatch(getProductById(productId));
        setProductModalOpen(true);
    };

    const handleProductViewClose = () => {
        setProductModalOpen(false);
    };

    const handleCartViewOpen = (cartId) => {
        setSelectedCartId(cartId);
        dispatch(getCarttwo(cartId));
        setCartModalOpen(true);
    };

    const handleCartViewClose = () => {
        setCartModalOpen(false);
    };

    const [filteredProductTypes, setFilteredProductTypes] = useState([]);

    const handleProductFamilyChange = (e) => {
        const selectedFamily = e.target.value;
        setProductFamille(selectedFamily);
        setFilteredProductTypes(productTypeMapping[selectedFamily] || []);
        setProductType('');
    };

    const userRows = users.map((item) => ({
        id: item._id,
        username: item.username,
        email: item.email,
        role: item.roles[0].name
    }));

    const userColumns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <RoleSelector userId={params.id} role={params.row.role} />
            )
        },
    ];

    const productColumns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'famille', headerName: 'Famille', width: 200 },
        {
            field: 'files',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
                params.value[0] ? (
                    <img src={params.value[0].url} alt={params.row.name} style={{ width: 'auto', height: 100, borderRadius: '10px' }} />
                ) : 'No image'
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton color="primary" aria-label="view" onClick={() => handleProductViewOpen(params.row.realProductId)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton color="info" aria-label="edit" onClick={() => handleProductEditClick(params.row.realProductId)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleProductDeleteConfirm(params.row.realProductId)}>
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const productRows = products.map((product, index) => ({
        id: index,
        realProductId: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        famille: product.famille,
        files: product.files
    }));

    const cartColumns = [
        { field: 'cartId', headerName: 'Cart ID', width: 200 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phoneNumber', headerName: 'Number', width: 150 },
        { field: 'message', headerName: 'Message', width: 150 },
        { field: 'total', headerName: 'Amount', width: 150 },
        {
            field: 'productDetails',
            headerName: 'Products',
            width: 400,
            renderCell: (params) => (
                <Tooltip
                    title={
                        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, lineHeight: '1.5' }}>
                            {params.value.split('\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    }
                    enterDelay={300}
                    leaveDelay={200}
                    placement="top"
                >
                    <div>
                        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, lineHeight: '1.5' }}>
                            {params.value.split('\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Tooltip>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <strong>
                    <IconButton color="primary" aria-label="view" onClick={() => handleCartViewOpen(params.row.cartId)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton color="info" aria-label="edit" onClick={() => handleEditClick(params.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const cartRows = carts.map(cart => {
        // No need for conditional checks, handle missing data gracefully in the modal
        const productDetails = cart.items.reduce((details, item) => {
            const detail = `${item.product?.name || 'Unknown'} (Qty: ${item.quantity})`;
            return details ? `${details}\n${detail}` : detail;
        }, "");

        return {
            id: cart._id,
            cartId: cart.cartId,
            userName: cart.userInfo?.name || 'Unknown',
            email: cart.userInfo?.email || 'Unknown',
            phoneNumber: cart.userInfo?.phoneNumber || 'Unknown',
            message: cart.userInfo?.message || 'Unknown',
            total: cart.total,
            productDetails: productDetails
        };
    });

    // Data for the pie chart
    const pieData = {
        labels: ['Products', 'Devis'],
        datasets: [{
            data: [products.length, carts.length],
            backgroundColor: ['#073352', '#36A2EB'],
            hoverBackgroundColor: ['#073352', '#36A2EB']
        }]
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '400px' }}>
                    <Pie data={pieData} />
                </div>
            </div>
            <h1 style={{ marginBottom: "5rem", marginTop: "5rem" }}>Devis Table</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={cartRows}
                    columns={cartColumns}
                    pageSize={5}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <h1 style={{ marginBottom: "5rem", marginTop: "5rem" }}>User Table</h1>
                <DataGrid
                    rows={userRows}
                    columns={userColumns}
                    pageSize={5}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <h1 style={{ marginBottom: "5rem", marginTop: "10rem" }}>Product Table</h1>
            <div style={{ height: 800, width: '100%', marginTop: '20px', marginBottom: '20rem' }}>
                <Button variant="contained" color="secondary" onClick={() => setAddProductModalOpen(true)}>Ajouter Produit</Button>
                <DataGrid
                    rows={productRows}
                    columns={productColumns}
                    pageSize={5}
                    checkboxSelection
                    rowHeight={120}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <Modal
                open={addProductModalOpen}
                onClose={() => setAddProductModalOpen(false)}
                aria-labelledby="add-product-modal-title"
                aria-describedby="add-product-modal-description"
            >
                <Box sx={style}>
                    <Typography id="add-product-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Ajouter un produit
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                        <TextField
                            label="Nom du produit"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <TextField
                            label="Prix"
                            fullWidth
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <TextField
                            label="Famille"
                            fullWidth
                            select
                            value={productFamille}
                            onChange={handleProductFamilyChange}
                        >
                            {productFamilies.map((family, index) => (
                                <MenuItem key={index} value={family}>
                                    {family}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Type"
                            fullWidth
                            select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            disabled={!productFamille}
                        >
                            {filteredProductTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setProductFiles(e.target.files)}
                            style={{ marginTop: '16px' }}
                        />
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleAddProduct} color="primary">
                                Sauvegarder
                            </Button>
                            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
                                Annuler
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={productConfirmOpen}
                onClose={() => setProductConfirmOpen(false)}
                aria-labelledby="product-delete-confirm-title"
                aria-describedby="product-delete-confirm-description"
            >
                <Box sx={style}>
                    <Typography id="product-delete-confirm-title" variant="h6" component="h2" sx={titleStyle}>
                        Confirmer la suppression du produit
                    </Typography>
                    <Typography id="product-delete-confirm-description" sx={{ mt: 2, ...labelStyle }}>
                        Êtes-vous sûr de vouloir supprimer ce produit ?
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleProductDelete} color="error">
                            Confirmer
                        </Button>
                        <Button variant="outlined" onClick={() => setProductConfirmOpen(false)} sx={{ ml: 2 }}>
                            Annuler
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={productModalOpen}
                onClose={handleProductViewClose}
                aria-labelledby="product-view-modal-title"
                aria-describedby="product-view-modal-description"
            >
                <Box sx={style}>
                    <Typography id="product-view-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Détails du Produit
                    </Typography>
                    {productDetail ? (
                        <Typography id="product-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            <span style={labelStyle}>Nom:</span> {productDetail.name}<br />
                            <span style={labelStyle}>Description:</span> {productDetail.description}<br />
                            <span style={labelStyle}>Type:</span> {productDetail.type}<br />
                            <span style={labelStyle}>Famille:</span> {productDetail.famille}<br />
                            <span style={labelStyle}>Images:</span> {productDetail.files.map((file, index) => (
                                <img key={index} src={file.url} alt="Product" style={{ width: 100, height: 100, borderRadius: '10px' }} />
                            ))}
                        </Typography>
                    ) : (
                        <Typography id="product-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            Chargement des détails...
                        </Typography>
                    )}
                </Box>
            </Modal>

            <Modal
                open={editProductModalOpen}
                onClose={handleClose}
                aria-labelledby="edit-product-modal-title"
                aria-describedby="edit-product-modal-description"
            >
                <Box sx={style}>
                    <Typography id="edit-product-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Modifier le produit
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            required
                            value={editProductData.name}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            required
                            value={editProductData.description}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleSaveEditProduct} color="primary">
                                Sauvegarder
                            </Button>
                            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
                                Annuler
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={cartModalOpen}
                onClose={handleCartViewClose}
                aria-labelledby="cart-view-modal-title"
                aria-describedby="cart-view-modal-description"
            >
                <Box sx={style}>
                    <Typography id="cart-view-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Détails du Cart
                    </Typography>
                    {cartDetail ? (
                        <Typography id="cart-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            <span style={labelStyle}>Cart ID:</span> {cartDetail.cartId}<br />
                            <span style={labelStyle}>User Name:</span> {cartDetail.userInfo?.name || 'Unknown'}<br />
                            <span style={labelStyle}>Email:</span> {cartDetail.userInfo?.email || 'Unknown'}<br />
                            <span style={labelStyle}>Phone Number:</span> {cartDetail.userInfo?.phoneNumber || 'Unknown'}<br />
                            <span style={labelStyle}>Message:</span> {cartDetail.userInfo?.message || 'Unknown'}<br />
                            <span style={labelStyle}>Total:</span> {cartDetail.total}<br />
                            <span style={labelStyle}>Products:</span> {cartDetail.items.map((item, index) => (
                                <div key={index}>
                                    {item.product?.name || 'Unknown'} (Qty: {item.quantity})
                                </div>
                            ))}
                        </Typography>
                    ) : (
                        <Typography id="cart-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            Chargement des détails...
                        </Typography>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Tables;
