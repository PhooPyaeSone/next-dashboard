import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Editing Invoice',
};
export default async function Page(props: {
    params: Promise<{ id: string }>;
}) {
    const id = await props.params.then((params) => params.id);
    const [customers, invoice] = await Promise.all([
        fetchCustomers(),
        fetchInvoiceById(id),
    ]);
    if (!invoice) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditInvoiceForm invoice={invoice} customers={customers} />
        </main>
    );
}