import { setConfig, buildImageUrl, extractPublicId } from 'cloudinary-build-url'

setConfig({
    cloudName: "iset-sfax",
    apiKey: "734647141496555",
})

export const useCloudinary = (fullPath) => {
    const publicId = extractPublicId(fullPath);
    
    const transformations = ref({});

    const url = computed(() => {
        return buildUrl(publicId, {
            transformations: transformations.value,
        });
    });

    return {
        url,
        transformations,
    }
}