export enum Notify {
  SAVE_SUCCESS = 'SAVE_SUCCESS',
  SAVE_FAIL = 'SAVE_FAIL',
  UPLOAD_SUCCESS = 'UPLOAD_SUCCESS',
  UPLOAD_FAIL = 'UPLOAD_FAIL',
  SEND_FOR_REVIEW_SUCCESS = 'SEND_FOR_REVIEW_SUCCESS',
  SEND_FOR_REVIEW_FAIL = 'SEND_FOR_REVIEW_FAIL',
  REVIEW_SUCCESS = 'REVIEW_SUCCESS',
  REVIEW_FAIL = 'REVIEW_FAIL',
  PUBLISH_SUCCESS = 'PUBLISH_SUCCESS',
  PUBLISH_SUCCESS_LATE = 'PUBLISH_SUCCESS_LATE',
  PUBLISH_FAIL = 'PUBLISH_FAIL',
  PROCESS_FAIL = 'PROCESS_FAIL',
  EMAIL_SUCCESS = 'EMAIL_SUCCESS',
  EMAIL_FAIL = 'EMAIL_FAIL',
  EMAIL_PARTIAL_SUCCESS = 'EMAIL_PARTIAL_SUCCESS',
  CONTENT_FAIL = 'CONTENT_FAIL',
  COPY = 'COPY',
  NO_ROLE = 'NO_ROLE',
  IPR_DECLARATION_PF = 'IPR_DECLARATION_PF',
  DUPLICTE = 'DUPLICTE',
  MULTI_STRIP_VIOLATION = 'MULTI_STRIP_VIOLATION',
  INVALID_FORMAT = 'INVALID_FORMAT',
  ACCEPT_LICENSE_TNC = 'ACCEPT_LICENSE_TNC',
  SIZE_ERROR = 'SIZE_ERROR',
  UP_TO_DATE = 'UP_TO_DATE',
  MANDATORY_FIELD_ERROR = 'MANDATORY_FIELD_ERROR',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  BODY_OR_URL = 'BODY_OR_URL',
  NO_CONTENT = 'NO_CONTENT',
  DATA_PRESENT = 'DATA_PRESENT',
  FORCE_SAVE = 'FORCE_SAVE',
  IPR_DECLARATION = 'IPR_DECLARATION',
  UPLOAD_FILE = 'UPLOAD_FILE',
  CREATE_CONTENT = 'CREATE_CONTENT',
  TRANSCODE_FAIL = 'TRANSCODE_FAIL',
  CURATE_MANDATORY_MISS = 'CURATE_MANDATORY_MISS',
  KBOARD_MANDATORY_MISS = 'KBOARD_MANDATORY_MISS',
  CREATE_MANDATORY_MISS = 'CREATE_MANDATORY_MISS',
  NO_ACCESS = 'NO_ACCESS',
  DELETED = 'DELETED',
  WINDOW_SIZE_ERROR = 'WINDOW_SIZE_ERROR',
  CONTENT_CREATE_SUCCESS = 'CONTENT_CREATE_SUCCESS',
  NOT_READY = 'NOT_READY',
  LINK_UPLOAD = 'LINK UPLOAD',
  DELETE = 'DELETE',
  RESOLUTION_MISMATCH = 'RESOLUTION_MISMATCH',
  // quiz/assessment editor notifications
  RESOURCE_NO_QUIZ = 'RESOURCE_NO_QUIZ',
  ASSESSMENT_MIN_QUIZ = 'ASSESSMENT_MIN_QUIZ',
  QUESTION_EMPTY = 'QUESTION_EMPTY',
  QUESTION_SPACES_ALONE = 'QUESTION_SPACES_ALONE',
  OPTION_EMPTY = 'OPTION_EMPTY',
  OPTION_SPACES_ALONE = 'OPTION_SPACES_ALONE',
  MCQ_ALL_OPTIONS_CORRECT = 'MCQ_ALL_OPTIONS_CORRECT',
  MCQ_NO_OPTION_CORRECT = 'MCQ_NO_OPTION_CORRECT',
  FILLUPS_BLANKS_OPTIONS = 'FILLUPS_BLANKS_OPTIONS',
  MAX_QUIZ_REACHED = 'MAX_QUIZ_REACHED',
  MAX_OPTIONS_REACHED = 'MAX_OPTIONS_REACHED',
  // webmodule editor notifications
  WEB_MODULE_MIN_PAGE_REQUIRED = 'WEB_MODULE_MIN_PAGE_REQUIRED',
  WEB_MODULE_PAGE_EMPTY = 'WEB_MODULE_PAGE_EMPTY',
  WEB_MODULE_AUDIO_ALL_LANGUAGES_PRESENT = 'WEB_MODULE_AUDIO_ALL_LANGUAGES_PRESENT',
  // class diagram editor notifications
  EMPTY_PROBLEM_STATEMENT = 'EMPTY_PROBLEM_STATEMENT',
  CLASS_DIAGRAM_NO_CLASS = 'CLASS_DIAGRAM_NO_CLASS',
  EMPTY_CLASS_NAME = 'EMPTY_CLASS_NAME',
  CLASS_NO_ATTRIBUTE_NO_METHOD = 'CLASS_NO_ATTRIBUTE_NO_METHOD',
  CLASS_USED_IN_RELATION = 'CLASS_USED_IN_RELATION',
  CLASS_NAME_TAKEN = 'CLASS_NAME_TAKEN',
  RELATION_EXISTS = 'RELATION_EXISTS',
  RELATION_MIN_CLASS_REQUIRED = 'RELATION_MIN_CLASS_REQUIRED',
  // auth role request notifications
  ROLE_REQUEST_SUBMIT_SUCCESS = 'ROLE_REQUEST_SUBMIT_SUCCESS',
  ROLE_REQUEST_SUBMIT_FAILURE = 'ROLE_REQUEST_SUBMIT_FAILURE',
  URL_UPLOAD_LINK_FAIL = 'URL_UPLOAD_LINK_FAIL',
  FILL_SPACE_ASSET_TYPE = 'FILL_SPACE_ASSET_TYPE',
  VALID_ASSET_LINK_URL_FAILURE = 'VALID_ASSET_LINK_URL_FAILURE',
  VALID_ASSET_UPLOAD_URL_FAILURE = 'VALID_ASSET_UPLOAD_URL_FAILURE',
}
