import React from "react";
import { User as FirebaseUser } from "firebase/auth";

import {
    AppCheckOptions,
    CMSAnalyticsEvent,
    FireCMSCustomization,
    FireCMSPlugin,
    Locale,
    useNavigationContext
} from "firecms";
import { FirestoreTextSearchController } from "./types/text_search";
import { Authenticator, FirebaseSignInOption, FirebaseSignInProvider } from "./types/auth";
import { FirebaseLoginViewProps } from "./components";
import { FirebaseApp } from "firebase/app";
import { FirestoreIndexesBuilder } from "./hooks";

/**
 * Main entry point that defines the CMS configuration
 * @category Firebase
 */
export type FireCMS3AppProps = {

    projectId: string;

    config: FireCMSCustomization;

    /**
     * Do the users need to log in to access the CMS.
     * You can specify an Authenticator function to discriminate which users can
     * access the CMS or not.
     * If not specified, authentication is enabled but no user restrictions
     * apply
     */
    authentication?: boolean | Authenticator<FirebaseUser>;

    /**
     * List of sign in options that will be displayed in the login
     * view if `authentication` is enabled. You can pass Firebase providers strings,
     * such as `firebase.auth.GoogleAuthProvider.PROVIDER_ID` or include additional
     * config such as scopes or custom parameters
     * {@link FirebaseSignInOption}
     * Defaults to Google sign in only.
     */
    signInOptions?: Array<FirebaseSignInProvider | FirebaseSignInOption>;

    /**
     * If authentication is enabled, allow the user to access the content
     * without login.
     */
    allowSkipLogin?: boolean;

    /**
     * Firebase configuration of the project. If you afe deploying the app to
     * Firebase hosting, you don't need to specify this value
     */
    firebaseConfig?: Record<string, unknown>;

    /**
     * Optional callback after Firebase has been initialised. Useful for
     * using the local emulator or retrieving the used configuration.
     * @param config
     */
    onFirebaseInit?: (config: object, app: FirebaseApp) => void;

    /**
     * Use this to enable Firebase App Check
     */
    appCheckOptions?: AppCheckOptions;

    /**
     * Primary color of the theme of the CMS
     */
    primaryColor?: string;

    /**
     * Secondary color of the theme of the CMS
     */
    secondaryColor?: string

    /**
     * Font family string
     * e.g.
     * '"Roboto", "Helvetica", "Arial", sans-serif'
     */
    fontFamily?: string

    /**
     * A component that gets rendered on the upper side of the main toolbar
     */
    toolbarExtraWidget?: React.ReactNode;

    /**
     * Format of the dates in the CMS.
     * Defaults to 'MMMM dd, yyyy, HH:mm:ss'
     */
    dateTimeFormat?: string;

    /**
     * Locale of the CMS, currently only affecting dates
     */
    locale?: Locale;

    /**
     * Use this controller to return text search results as document ids, that
     * get then fetched from Firestore.
     *
     */
    textSearchController?: FirestoreTextSearchController;

    /**
     * Default path under the navigation routes of the CMS will be created
     */
    basePath?: string;

    /**
     * Default path under the collection routes of the CMS will be created
     */
    baseCollectionPath?: string;

    /**
     * In case you need to override the home page.
     * You may want to use {@link useNavigationContext} in order to get the resolved
     * navigation.
     */
    HomePage?: React.ComponentType;

    /**
     * Additional props passed to the login view. You can use this props
     * to disable registration in `password` mode, or to set up an additional
     * message. Also, to add additional views to the login screen or disable
     * the buttons.
     */
    LoginView?: React.ComponentType<FirebaseLoginViewProps>;

    /**
     * Callback used to get analytics events from the CMS
     */
    onAnalyticsEvent?: (event: CMSAnalyticsEvent, data?: object) => void;

    /**
     * Use plugins to modify the behaviour of the CMS.
     * Currently, in ALPHA, and likely subject to change.
     */
    plugins?: FireCMSPlugin[];

    /**
     * Open the drawer on hover. Defaults to `false`
     */
    autoOpenDrawer?: boolean;

    /**
     * Use this builder to indicate which indexes are available in your
     * Firestore database. This is used to allow filtering and sorting
     * for multiple fields in the CMS.
     */
    firestoreIndexesBuilder?: FirestoreIndexesBuilder;

};
