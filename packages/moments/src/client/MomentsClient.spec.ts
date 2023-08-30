import { anyFunction, mock, MockProxy } from 'jest-mock-extended';
import { PoapCompass, PoapMomentsApi } from '@poap-xyz/providers';
import { MomentsClient } from './MomentsClient';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';
import { v4 } from 'uuid';

describe('MomentsClient', () => {
  const MOMENT_ID = 'this-is-a-moment-id';
  const DROP_ID = 420;
  const TOKEN_ID = 69;
  const AUTHOR = '0x7CE5368171cC3D988157d7dab3D313d7bd43de3e';
  const FILE_1 = Buffer.from('This is the file 1');
  const FILE_1_TYPE = 'image/png';
  const FILE_2 = Buffer.from('This is the file 2');
  const FILE_2_TYPE = 'image/jpeg';
  const MEDIA_UPLOAD_URL = 'this-is-a-media-upload-url';
  const DESCRIPTION = 'This is a description';
  const MEDIAS_TO_CREATE = [
    {
      fileBinary: FILE_1,
      fileType: FILE_1_TYPE,
    },
    {
      fileBinary: FILE_2,
      fileType: FILE_2_TYPE,
    },
  ];

  let poapMomentsAPIMocked: MockProxy<PoapMomentsApi>;
  let compassProviderMocked: MockProxy<PoapCompass>;
  let onStepUpdate: jest.Mock;

  beforeEach(() => {
    poapMomentsAPIMocked = mock<PoapMomentsApi>();
    compassProviderMocked = mock<PoapCompass>();
    onStepUpdate = jest.fn();
  });

  describe('createMoment', () => {
    it('should create a moment', async () => {
      // GIVEN
      const client = new MomentsClient(
        poapMomentsAPIMocked,
        compassProviderMocked,
      );
      const inputs: CreateMomentInput = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        medias: MEDIAS_TO_CREATE,
        author: AUTHOR,
        onStepUpdate,
        description: DESCRIPTION,
      };
      poapMomentsAPIMocked.createMoment.mockResolvedValue({
        id: MOMENT_ID,
        author: AUTHOR,
        createdOn: new Date(),
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
      });
      const mediaKeys: string[] = [];
      poapMomentsAPIMocked.getSignedUrl.mockImplementation(async () => {
        const key = v4();
        mediaKeys.push(key);
        return {
          url: MEDIA_UPLOAD_URL,
          key,
        };
      });

      const EXPECTED_MOMENT_CREATE_INPUT = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        author: AUTHOR,
        description: DESCRIPTION,
        mediaKeys,
      };

      // WHEN
      const moment = await client.createMoment(inputs);

      // THEN
      expect(moment.id).toBe(MOMENT_ID);
      expect(moment.author).toBe(AUTHOR);
      expect(moment.dropId).toBe(DROP_ID);
      expect(moment.tokenId).toBe(TOKEN_ID);
      expect(poapMomentsAPIMocked.createMoment).toHaveBeenCalledWith(
        EXPECTED_MOMENT_CREATE_INPUT,
      );
      expect(poapMomentsAPIMocked.getSignedUrl).toHaveBeenCalledTimes(2);
      expect(poapMomentsAPIMocked.uploadFile).toHaveBeenCalledWith(
        FILE_1,
        MEDIA_UPLOAD_URL,
        FILE_1_TYPE,
        anyFunction(),
      );
      expect(poapMomentsAPIMocked.uploadFile).toHaveBeenCalledWith(
        FILE_2,
        MEDIA_UPLOAD_URL,
        FILE_2_TYPE,
        anyFunction(),
      );
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.PROCESSING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MOMENT);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.FINISHED);
      expect(onStepUpdate).toHaveBeenCalledTimes(4);
    });
  });
});
