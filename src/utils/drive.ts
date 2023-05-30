import { google } from "googleapis";
import { Readable } from "stream";

const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oauth2client.setCredentials({
    refresh_token: process.env.REFERSH_TOKEN,
});

const drive = google.drive({
    version: "v3",
    auth: oauth2client,
});

export default drive;

export function bufferToStream(buffer: any) {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    return stream;
}

export const getUrl = async (fileId: string) => {
    const result = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
    });

    return result;
};
