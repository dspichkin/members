export class AppSettings {
    static host = document.location.hostname;
    static protocol = document.location.protocol;
    
    public static base_url;
    public static URL_MEMBERS;
    
    static initialized() {

        if (AppSettings.host.indexOf('localhost') > -1 || AppSettings.host.indexOf('127.0.0.1') > -1) {
            AppSettings.base_url = AppSettings.protocol + '//' + AppSettings.host + ':8000';
        } else {
            AppSettings.base_url = AppSettings.protocol + '//' + AppSettings.host;
        }

        AppSettings.URL_MEMBERS = '/assets/generated.json';

    }


}