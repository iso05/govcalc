// Optional public details: provide these before the competition submission.
// Never put a team invitation code or private credentials here.
function publicUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch { return undefined; }
}

export const pitch = {
  team: 'GovMind',
  product: 'Hisobchi',
  founder: process.env.FOUNDER_NAME?.trim() || 'Muhammadiso Jo‘rayev',
  founderUrl: publicUrl(process.env.FOUNDER_PROFILE_URL) || 'https://github.com/iso05',
  linkedin: 'https://www.linkedin.com/in/muhammad-iso-jo-rayev-82409732b/',
  videoUrl: publicUrl(process.env.DEMO_VIDEO_URL) || '/media/hisobchi-demo-20261005.mp4',
  prototype: '/calculators/fhdyo-tugilganlik-guvohnomasi',
};
