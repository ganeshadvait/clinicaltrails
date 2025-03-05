import { useRouter } from 'next/router';

const FolderPage = () => {
  const router = useRouter();
  const { foldername } = router.query;  // Access the foldername from the URL

  return (
    <div>
      <h1>Welcome to the {foldername} folder</h1>
      <p>Content based on the folder name: {foldername}</p>
    </div>
  );
};

export default FolderPage;
