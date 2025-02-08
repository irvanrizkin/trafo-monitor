export default function statusFormatterText(status: string){
    if (status === 'normal') {
        return 'Aman';
    }
    if (status === 'warning') {
        return 'Perlu Perhatian';
    }
    if (status === 'danger') {
        return 'Tidak Aman, Perlu Tindakan';
    }
    return '-';
}