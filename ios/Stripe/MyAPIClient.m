//
//  MyAPIClient.m
//  eDance
//
//  Created by highjump on 2020/11/7.
//

#import "MyAPIClient.h"
#import <Stripe/Stripe.h>
#import "Config.h"
#import "StripeManager.h"

@interface MyAPIClient() <STPEphemeralKeyProvider>

@end

@implementation MyAPIClient

- (void)createCustomerKeyWithAPIVersion:(nonnull NSString *)apiVersion completion:(nonnull STPJSONResponseCompletionBlock)completion {
  NSString *customerId = [[StripeManager shared] getCustomerId];
  
  NSURL *url = [[NSURL URLWithString:SERVER_URL] URLByAppendingPathComponent:@"/api/v1/stripe/ephemeral_keys"];
  NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
  urlComponents.queryItems = @[
    [[NSURLQueryItem alloc] initWithName:@"apiVersion" value:apiVersion],
    [[NSURLQueryItem alloc] initWithName:@"customerId" value:customerId],
  ];
  
  NSURLRequest *request = [[NSURLRequest alloc] initWithURL:urlComponents.URL];
  NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      if (data != nil && [response isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)response).statusCode == 200) {
          NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
          completion(json, nil);
      } else {
          completion(nil, error);
      }
  }];
  [task resume];
}

@end
