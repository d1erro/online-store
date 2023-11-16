import Link from 'next/link';
import { Button } from '@mui/material';
import AddBrand from '@/components/AdminPanel/AddBrand/AddBrand';
import AddCategory from '@/components/AdminPanel/AddCategory/AddCategory';

const AdminPanel = () => {
    return (
        <div className="flex flex-col">
            <Link href="/admin/product/add">
                <Button variant="contained" color="secondary">
                    Добавить товар
                </Button>
            </Link>

            <AddBrand />

            <AddCategory />
        </div>
    );
};

export default AdminPanel;
